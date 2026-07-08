// ════════════════════════════════════════════════════════════════════
// create-esewa-order
//
// Called by the React Native app when a logged-in user taps "Buy"
// on a pass plan. Requires a valid Clerk JWT (auth: 'user').
//
// The client sends ONLY the plan identifier ("monthly" or "3month").
// The price is looked up server-side from the products table to
// prevent tampering (a client cannot pay Rs 1 for a Rs 249 pass).
//
// Returns all fields the app needs to render the eSewa payment form
// in a WebView.
// ════════════════════════════════════════════════════════════════════

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server";
import {
  generateSignature,
  getEsewaConfig,
  isValidPlan,
  PRODUCTS,
  SIGNED_FIELD_NAMES,
} from "../_shared/esewa.ts";

export default {
  fetch: withSupabase({ auth: ["user"] }, async (req, ctx) => {
    // ── 1. Get the authenticated user's Clerk ID ────────────────────
    // ctx.userClaims is populated from the verified Clerk JWT
    const clerkId = ctx.userClaims?.id as string | undefined;
    if (!clerkId) {
      return Response.json({ error: "Unauthorized — no valid user JWT" }, { status: 401 });
    }

    // ── 2. Parse and validate the request body ──────────────────────
    let body: { plan?: string };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { plan } = body;
    if (!plan || !isValidPlan(plan)) {
      return Response.json(
        {
          error: `Invalid plan "${plan ?? ""}". Must be "monthly" or "3month".`,
        },
        { status: 400 },
      );
    }

    // ── 3. Look up price from server-side source of truth ───────────
    const product = PRODUCTS[plan];
    const amount = product.price;
    const taxAmount = 0;
    const serviceCharge = 0;
    const deliveryCharge = 0;
    const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;

    // ── 4. Generate a unique transaction UUID ───────────────────────
    // This UUID is sent to eSewa and used to reconcile the callback.
    const transactionUuid = crypto.randomUUID();

    // ── 5. Get eSewa configuration ──────────────────────────────────
    const esewa = getEsewaConfig();

    // ── 6. Insert a PENDING transaction row ─────────────────────────
    // Using ctx.supabaseAdmin (service role) to bypass RLS.
    // The user can only read their own transactions via RLS.
    const { data: transaction, error: insertError } = await ctx.supabaseAdmin
      .from("transactions")
      .insert({
        clerk_id: clerkId,
        product_id: product.id,
        transaction_uuid: transactionUuid,
        amount: amount,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        status: "PENDING",
      })
      .select("*")
      .single();

    if (insertError || !transaction) {
      console.error("Failed to insert transaction:", insertError);
      return Response.json({ error: "Failed to create order — please try again" }, { status: 500 });
    }

    // ── 7. Generate the eSewa HMAC-SHA256 signature ─────────────────
    // The field order in the base string MUST match SIGNED_FIELD_NAMES
    const signature = await generateSignature(
      totalAmount,
      transactionUuid,
      esewa.productCode,
      esewa.secretKey,
    );

    // ── 8. Return everything the app needs to POST the eSewa form ───
    // The app opens esewa.formUrl in a WebView and POSTs these fields.
    //
    // Security note: signature and transaction_uuid are safe to expose.
    // The signature can only be generated server-side (secret key is never
    // exposed to the client). transaction_uuid is a UUID — it authorizes
    // nothing on its own.
    return Response.json({
      amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: esewa.productCode,
      product_service_charge: serviceCharge,
      product_delivery_charge: deliveryCharge,
      success_url: esewa.successUrl,
      failure_url: esewa.failureUrl,
      signed_field_names: SIGNED_FIELD_NAMES,
      signature,
      // The form action URL is included so the app knows where to POST
      form_action_url: esewa.formUrl,
    });
  }),
};
