// ════════════════════════════════════════════════════════════════════
// reverse-geocode
//
// Called by the mobile app (landlord location picker) when a pin is
// dropped or the current location is fetched. Requires a valid Clerk JWT
// (verified manually via jose).
//
// The client sends ONLY coordinates; the nearest locality/area name is
// resolved server-side via Nominatim (OpenStreetMap) — no API key
// needed. Returns `{ area }` which the app auto-fills into the editable
// `locationArea` field.
// ════════════════════════════════════════════════════════════════════

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server";
import { verifyClerkJwt } from "../_shared/auth.ts";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";

export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    // ── 1. Verify the Clerk JWT ────────────────────────────────────
    try {
      await verifyClerkJwt(req);
    } catch (err) {
      console.error("Clerk JWT verification failed:", err);
      return Response.json(
        { error: "Unauthorized — invalid or missing session token" },
        { status: 401 },
      );
    }

    // ── 2. Parse and validate the request body ─────────────────────
    let body: { latitude?: number; longitude?: number };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { latitude, longitude } = body;
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      Math.abs(latitude) > 90 ||
      Math.abs(longitude) > 180
    ) {
      return Response.json(
        { error: "Valid latitude and longitude are required" },
        { status: 400 },
      );
    }

    // ── 3. Reverse geocode via Nominatim ───────────────────────────
    try {
      const url = new URL(NOMINATIM_URL);
      url.searchParams.set("lat", latitude.toString());
      url.searchParams.set("lon", longitude.toString());
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("zoom", "16");

      const response = await fetch(url.toString(), {
        headers: {
          // Nominatim requires a descriptive User-Agent.
          "User-Agent": "BasoBas-App/1.0 (contact: support@basobas.com)",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Nominatim request failed:", response.status);
        return Response.json(
          { error: "Geocoding service unavailable" },
          { status: 502 },
        );
      }

      const data = await response.json();

      // ── 4. Pick the most usable locality label ───────────────────
      // Prefer a neighborhood/suburb, fall back through town/city,
      // then the full display name as a last resort.
      const address = data?.address ?? {};
      const area =
        address.suburb ??
        address.neighbourhood ??
        address.town ??
        address.city ??
        address.county ??
        address.municipality ??
        (typeof data?.display_name === "string" ? data.display_name : "");

      if (!area) {
        return Response.json({ area: "" });
      }

      return Response.json({ area });
    } catch (err) {
      console.error("Reverse geocode failed:", err);
      return Response.json(
        { error: "Geocoding service unavailable" },
        { status: 502 },
      );
    }
  }),
};
