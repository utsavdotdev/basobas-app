// ════════════════════════════════════════════════════════════════════
// esewa-payment-failed
//
// Called by eSewa's redirect when a payment is canceled or fails.
// eSewa redirects the browser to {failure_url}?data=<base64>.
//
// This function marks the matching transaction as FAILED (only if it
// is still PENDING — never overwrite a COMPLETE status), then
// redirects the WebView to a deep link so the app can close it.
// ════════════════════════════════════════════════════════════════════

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server";

export default {
  fetch: withSupabase({ auth: ["none"] }, async (req, ctx) => {
    // ── 1. Extract data from query string ──────────────────────────
    const url = new URL(req.url);
    const data = url.searchParams.get("data");

    if (!data) {
      console.error("esewa-payment-failed: missing 'data' query param");
      return Response.redirect("basobas://payment-failed?reason=missing_data", 302);
    }

    // ── 2. Decode the callback payload ─────────────────────────────
    let decoded: string;
    let payload: Record<string, string>;

    try {
      decoded = atob(data);
      payload = JSON.parse(decoded);
    } catch {
      console.error("esewa-payment-failed: invalid Base64/JSON in data param");
      return Response.redirect("basobas://payment-failed?reason=invalid_payload", 302);
    }

    const transactionUuid = payload.transaction_uuid as string;

    if (!transactionUuid) {
      console.error("esewa-payment-failed: no transaction_uuid in payload");
      return Response.redirect("basobas://payment-failed?reason=missing_transaction_uuid", 302);
    }

    // ── 3. Look up and mark the transaction as FAILED ───────────────
    // Only update if the status is still PENDING — don't overwrite a
    // COMPLETE or already-FAILED transaction.
    const { error: updateError } = await ctx.supabaseAdmin
      .from("transactions")
      .update({
        status: "FAILED",
        raw_callback: payload,
      })
      .eq("transaction_uuid", transactionUuid)
      .eq("status", "PENDING");  // Only update if still PENDING

    if (updateError) {
      console.error(
        `Failed to mark transaction ${transactionUuid} as FAILED:`,
        updateError,
      );
    }

    // ── 4. Redirect to deep link so the app can close the WebView ──
    return Response.redirect(
      `basobas://payment-failed?transaction_uuid=${transactionUuid}`,
      302,
    );
  }),
};
