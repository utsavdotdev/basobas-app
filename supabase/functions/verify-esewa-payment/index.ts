// ════════════════════════════════════════════════════════════════════
// verify-esewa-payment
//
// Called by eSewa's redirect after a successful payment.
// eSewa redirects the browser to {success_url}?data=<base64>.
//
// ⚠️ CRITICAL SECURITY: Do NOT trust the redirect alone — the
//    `data` param is fully client-controlled and could be forged.
//    This function performs TWO independent verifications:
//      1. HMAC signature verification — confirms the payload was
//         genuinely signed by eSewa (or at least someone with the
//         secret key — which only eSewa and we have).
//      2. Server-to-server status check — hits eSewa's own API to
//         confirm the transaction is truly COMPLETE on their side.
//
// Only after BOTH checks pass is the user_pass granted.
//
// The app's WebView intercepts the redirect to a deep link like
//   basobas://payment-success?transaction_uuid=...
//   basobas://payment-failed?reason=...
// ════════════════════════════════════════════════════════════════════

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server";
import {
  checkEsewaTransactionStatus,
  getEsewaConfig,
  grantUserPass,
  verifyCallbackSignature,
} from "../_shared/esewa.ts";

export default {
  fetch: withSupabase({ auth: ["none"] }, async (req, ctx) => {
    // ── 1. Extract the Base64 data param from the query string ─────
    const url = new URL(req.url);
    const data = url.searchParams.get("data");

    if (!data) {
      console.error("verify-esewa-payment: missing 'data' query param");
      return Response.redirect("basobas://payment-failed?reason=missing_data", 302);
    }

    // ── 2. Verify the HMAC signature on the callback payload ────────
    // If this fails, the payload was either not from eSewa or was tampered with.
    const esewa = getEsewaConfig();
    const { valid, payload } = await verifyCallbackSignature(data, esewa.secretKey);

    if (!valid) {
      console.error(
        "SIGNATURE MISMATCH — possible tampering attempt:",
        JSON.stringify(payload),
      );
      return Response.redirect(
        "basobas://payment-failed?reason=signature_mismatch",
        302,
      );
    }

    // Extract verified fields from the decoded payload
    const transactionUuid = payload.transaction_uuid as string;
    const totalAmount = Number(payload.total_amount);
    const productCode = payload.product_code as string;
    const esewaRefId = payload.transaction_code as string;

    if (!transactionUuid || !totalAmount || !productCode) {
      console.error("Callback payload missing required fields:", JSON.stringify(payload));
      return Response.redirect(
        "basobas://payment-failed?reason=invalid_payload",
        302,
      );
    }

    // ── 3. Look up the local transaction row ────────────────────────
    const { data: transaction, error: lookupError } = await ctx.supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("transaction_uuid", transactionUuid)
      .single();

    if (lookupError || !transaction) {
      console.error(`Transaction not found for UUID: ${transactionUuid}`, lookupError);
      return Response.redirect(
        "basobas://payment-failed?reason=transaction_not_found",
        302,
      );
    }

    // ── 4. Idempotency check ────────────────────────────────────────
    // If the transaction is already COMPLETE, don't reprocess it.
    if (transaction.status === "COMPLETE") {
      console.log(`Transaction ${transactionUuid} already COMPLETE — returning success`);
      return Response.redirect(
        `basobas://payment-success?transaction_uuid=${transactionUuid}`,
        302,
      );
    }

    // ── 5. Verify that amounts match what we stored ─────────────────
    // Defense: confirm the callback's total_amount and product_code
    // match the values we inserted when the order was created.
    if (Number(transaction.total_amount) !== totalAmount) {
      console.error(
        `AMOUNT MISMATCH — stored=${transaction.total_amount}, callback=${totalAmount}. ` +
        `Transaction UUID: ${transactionUuid}`,
      );
      await markFailed(ctx.supabaseAdmin, transactionUuid, payload);
      return Response.redirect(
        "basobas://payment-failed?reason=amount_mismatch",
        302,
      );
    }

    // eSewa's product_code should match our env var
    if (productCode !== esewa.productCode) {
      console.error(
        `PRODUCT CODE MISMATCH — expected=${esewa.productCode}, callback=${productCode}`,
      );
      await markFailed(ctx.supabaseAdmin, transactionUuid, payload);
      return Response.redirect(
        "basobas://payment-failed?reason=product_code_mismatch",
        302,
      );
    }

    // ── 6. Server-to-server status check with eSewa ─────────────────
    // This is the most important verification: we independently check
    // with eSewa's API that this transaction is truly COMPLETE.
    // We NEVER trust the redirect callback alone.
    let esewaStatus;
    try {
      esewaStatus = await checkEsewaTransactionStatus(
        esewa.statusUrl,
        productCode,
        totalAmount,
        transactionUuid,
      );
    } catch (err) {
      console.error(
        `eSewa status check API call failed for ${transactionUuid}:`,
        err,
      );
      // Don't mark as failed here — it could be a transient network issue.
      // Return a generic error so the app can retry via check-payment-status.
      return Response.redirect(
        "basobas://payment-failed?reason=status_check_unavailable",
        302,
      );
    }

    if (esewaStatus.status !== "COMPLETE") {
      console.error(
        `eSewa status check returned "${esewaStatus.status}" (not COMPLETE) ` +
        `for transaction ${transactionUuid}`,
      );
      await markFailed(ctx.supabaseAdmin, transactionUuid, payload);
      return Response.redirect(
        `basobas://payment-failed?reason=esewa_status_${esewaStatus.status.toLowerCase()}`,
        302,
      );
    }

    // Also verify the amounts from the status check match
    if (esewaStatus.totalAmount && esewaStatus.totalAmount !== totalAmount) {
      console.error(
        `AMOUNT MISMATCH from eSewa status check — ` +
        `expected=${totalAmount}, got=${esewaStatus.totalAmount}`,
      );
      await markFailed(ctx.supabaseAdmin, transactionUuid, payload);
      return Response.redirect(
        "basobas://payment-failed?reason=amount_mismatch",
        302,
      );
    }

    // ── 7. All checks passed — look up product for duration ─────────
    const { data: product, error: productError } = await ctx.supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", transaction.product_id)
      .single();

    if (productError || !product) {
      console.error(
        `Product not found for ID: ${transaction.product_id}`,
        productError,
      );
      return Response.redirect(
        "basobas://payment-failed?reason=product_not_found",
        302,
      );
    }

    // ── 8. Mark transaction as COMPLETE ─────────────────────────────
    await ctx.supabaseAdmin
      .from("transactions")
      .update({
        status: "COMPLETE",
        esewa_ref_id: esewaRefId,
        raw_callback: payload,
      })
      .eq("transaction_uuid", transactionUuid);

    // ── 9. Grant the user pass (with stacking support) ──────────────
    try {
      await grantUserPass(
        ctx.supabaseAdmin,
        transaction.clerk_id,
        product.id,
        transaction.id,
        product.duration_months,
      );
    } catch (passError) {
      // The transaction is already COMPLETE, but the pass wasn't granted.
      // This is a critical inconsistency that needs manual review.
      console.error(
        `CRITICAL: Transaction ${transactionUuid} is COMPLETE but user_pass NOT created. ` +
        `Clerk ID: ${transaction.clerk_id}. Manual intervention required.`,
        passError,
      );
    }

    // ── 10. Redirect to deep link so the app can close the WebView ──
    return Response.redirect(
      `basobas://payment-success?transaction_uuid=${transactionUuid}`,
      302,
    );
  }),
};

// ─── Helper: Mark a transaction as FAILED ────────────────────────────
// Accepts supabaseAdmin directly (not the full ctx) for cleaner typing.

async function markFailed(
  supabaseAdmin: any,
  transactionUuid: string,
  payload: Record<string, string>,
) {
  try {
    await supabaseAdmin
      .from("transactions")
      .update({
        status: "FAILED",
        raw_callback: payload,
      })
      .eq("transaction_uuid", transactionUuid);
  } catch (err) {
    console.error(`Failed to mark transaction ${transactionUuid} as FAILED:`, err);
  }
}
