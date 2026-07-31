// ════════════════════════════════════════════════════════════════════
// geocode
//
// Called by the mobile app (tenant map search bar) to turn a free-text
// place query ("Baluwatar", "Thamel, Kathmandu") into candidate
// coordinates. Requires a valid Clerk JWT (verified manually via jose).
//
// Uses Nominatim (OpenStreetMap) search — no API key needed. Returns up
// to 5 matches with a locality label and coordinates, which the app
// shows as tappable suggestions to center the radius circle.
// ════════════════════════════════════════════════════════════════════

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server";
import { verifyClerkJwt } from "../_shared/auth.ts";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

const LAT_LNG = /^[-+]?\d{1,2}(\.\d+)?$/;

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
    let body: { query?: string };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const query = (body.query ?? "").trim();
    if (query.length < 2 || query.length > 200) {
      return Response.json(
        { error: "Query must be between 2 and 200 characters" },
        { status: 400 },
      );
    }

    // ── 3. Forward geocode via Nominatim ───────────────────────────
    try {
      const url = new URL(NOMINATIM_URL);
      url.searchParams.set("q", query);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "5");
      url.searchParams.set("addressdetails", "1");
      // Bias towards Nepal so "Baluwatar" finds Kathmandu, not elsewhere.
      url.searchParams.set("countrycodes", "np");

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

      const data = (await response.json()) as Array<{
        lat?: string;
        lon?: string;
        display_name?: string;
        address?: Record<string, string>;
      }>;

      // ── 4. Normalize into lightweight suggestions ────────────────
      const results = data
        .filter(
          (r) =>
            typeof r?.lat === "string" &&
            typeof r?.lon === "string" &&
            LAT_LNG.test(r.lat) &&
            LAT_LNG.test(r.lon),
        )
        .map((r) => {
          const address = r.address ?? {};
          const area =
            address.suburb ??
            address.neighbourhood ??
            address.town ??
            address.city ??
            address.county ??
            address.municipality ??
            "";
          return {
            name: r.display_name ?? "",
            area,
            lat: parseFloat(r.lat!),
            lng: parseFloat(r.lon!),
          };
        });

      return Response.json({ results });
    } catch (err) {
      console.error("Geocode failed:", err);
      return Response.json(
        { error: "Geocoding service unavailable" },
        { status: 502 },
      );
    }
  }),
};
