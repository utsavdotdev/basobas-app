import type { SupabaseClient } from '@supabase/supabase-js'
import { ok, err, getErrorMessage, type Result } from '@/src/lib/result'
import {
  toLandlordVisitRequest,
  type LandlordVisitRequest,
  type VisitRequestRow,
  type VisitRequestJoins,
  type TimeSlot,
  type VisitStatus,
} from '@/src/types/property.types'
import type { Database } from '@/src/types/database.types'

/**
 * `visit_requests` has two FKs into `profiles` (tenant_id, landlord_id), so the
 * tenant embed must name its constraint — an unqualified `profiles(...)` embed
 * is ambiguous and Supabase rejects it.
 */
const VISIT_SELECT = `
  *,
  tenant:profiles!visit_requests_tenant_id_fkey(full_name, avatar_url),
  property:properties!visit_requests_property_id_fkey(title, location_area)
` as const

type VisitSelectRow = VisitRequestRow & VisitRequestJoins

// ─── Reads ────────────────────────────────────────────────────────────────────

/**
 * Every visit request across the landlord's properties, newest first.
 *
 * Returns the full set — the 4-tab UI filters client-side via `statusUi` so
 * switching tabs doesn't re-query. Pass `statuses` to narrow server-side for
 * focused views (e.g. follow-up lists).
 */
export async function getVisitRequestsForLandlord(
  clerkId:   string,
  supabase:  SupabaseClient<Database>,
  statuses?: VisitStatus[]
): Promise<Result<LandlordVisitRequest[]>> {
  try {
    let query = supabase
      .from('visit_requests')
      .select(VISIT_SELECT)
      .eq('landlord_id', clerkId)

    if (statuses?.length) query = query.in('status', statuses)

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) return err(getErrorMessage(error))

    return ok(((data ?? []) as unknown as VisitSelectRow[]).map(toLandlordVisitRequest))
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

/**
 * One request by id, for the Request Detail screen. Returns `ok(null)` when the
 * row doesn't exist or RLS hides it (the viewer is neither party).
 */
export async function getVisitRequest(
  visitId:  string,
  supabase: SupabaseClient<Database>
): Promise<Result<LandlordVisitRequest | null>> {
  try {
    const { data, error } = await supabase
      .from('visit_requests')
      .select(VISIT_SELECT)
      .eq('id', visitId)
      .maybeSingle()

    if (error) return err(getErrorMessage(error))
    if (!data)  return ok(null)

    return ok(toLandlordVisitRequest(data as unknown as VisitSelectRow))
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

/** Count of requests still awaiting a landlord decision — drives the tab badge. */
export async function getPendingVisitCount(
  clerkId:  string,
  supabase: SupabaseClient<Database>
): Promise<Result<number>> {
  try {
    const { count, error } = await supabase
      .from('visit_requests')
      .select('id', { count: 'exact', head: true })
      .eq('landlord_id', clerkId)
      .eq('status', 'PENDING')

    if (error) return err(getErrorMessage(error))
    return ok(count ?? 0)
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

// ─── Mutations (SECURITY DEFINER RPCs) ────────────────────────────────────────
//
// There is deliberately no landlord UPDATE policy on `visit_requests`. Every
// landlord-side transition goes through these RPCs, which assert ownership via
// `requesting_user_id()` and recalculate the parent property's status. A
// permission failure surfaces here as a Postgres error, not a silent no-op.

/** PENDING → ACCEPTED. */
export async function acceptVisit(
  visitId:  string,
  supabase: SupabaseClient<Database>
): Promise<Result<LandlordVisitRequest>> {
  try {
    const { data, error } = await supabase.rpc('accept_visit_request', {
      p_visit_id: visitId,
    })

    if (error) return err(getErrorMessage(error))
    if (!data)  return err('Accept returned no request.')

    return ok(toLandlordVisitRequest(data as VisitRequestRow))
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

/** → REJECTED, storing the landlord's reason for the tenant to read. */
export async function rejectVisit(
  visitId:  string,
  reason:   string | null,
  supabase: SupabaseClient<Database>
): Promise<Result<LandlordVisitRequest>> {
  try {
    const { data, error } = await supabase.rpc('reject_visit_request', {
      p_visit_id: visitId,
      p_reason:   reason ?? undefined,
    })

    if (error) return err(getErrorMessage(error))
    if (!data)  return err('Decline returned no request.')

    return ok(toLandlordVisitRequest(data as VisitRequestRow))
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

/**
 * → RESCHEDULED with a new date/slot. The RPC caps this at 3 reschedules per
 * request and raises past that, which surfaces as an error string here.
 */
export async function rescheduleVisit(
  visitId:  string,
  newDate:  string,
  newSlot:  TimeSlot,
  message:  string | null,
  supabase: SupabaseClient<Database>
): Promise<Result<LandlordVisitRequest>> {
  try {
    const { data, error } = await supabase.rpc('reschedule_visit_request', {
      p_visit_id: visitId,
      p_new_date: newDate,
      p_new_slot: newSlot,
      p_message:  message ?? undefined,
    })

    if (error) return err(getErrorMessage(error))
    if (!data)  return err('Reschedule returned no request.')

    return ok(toLandlordVisitRequest(data as VisitRequestRow))
  } catch (e) {
    return err(getErrorMessage(e))
  }
}

/**
 * Close the deal: this request becomes RENTAL_FINALIZED, every other open
 * request on the property is CLOSED, and the property flips to OCCUPIED with
 * this tenant linked. Returns the updated property id.
 */
export async function finalizeRental(
  visitId:  string,
  supabase: SupabaseClient<Database>
): Promise<Result<{ propertyId: string }>> {
  try {
    const { data, error } = await supabase.rpc('finalize_rental', {
      p_visit_id: visitId,
    })

    if (error) return err(getErrorMessage(error))
    if (!data)  return err('Finalize returned no property.')

    const property = data as Database['public']['Tables']['properties']['Row']
    return ok({ propertyId: property.id })
  } catch (e) {
    return err(getErrorMessage(e))
  }
}
