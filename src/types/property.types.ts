/**
 * Canonical property / visit-request types for the BasoBas landlord side.
 *
 * This is the ONLY place DB enum strings are allowed to appear. Screens use
 * their own display vocabularies (they diverge — listings wants
 * `active/draft/paused/archived`, the requests tab wants `pending/accepted`,
 * the visit history wants `Pending Approval/Scheduled/…`), so every screen
 * reads through a `toXxx()` mapper here instead of comparing raw enums.
 *
 * Mirrors the `toKYCStatusUi` pattern in [kyc.types.ts](./kyc.types.ts).
 */
import type { Database } from './database.types';

// ─── DB row aliases ──────────────────────────────────────────────────────────

export type PropertyRow      = Database['public']['Tables']['properties']['Row'];
export type VisitRequestRow  = Database['public']['Tables']['visit_requests']['Row'];
export type SavedPropertyRow = Database['public']['Tables']['saved_properties']['Row'];

// ─── DB enum mirrors ─────────────────────────────────────────────────────────

export type PropertyType   = Database['public']['Enums']['property_type_enum'];
export type PropertyStatus = Database['public']['Enums']['property_status_enum'];
export type VisitStatus    = Database['public']['Enums']['visit_status_enum'];
export type TimeSlot       = Database['public']['Enums']['time_slot_enum'];

// ─── UI vocabularies (one per screen that needs one) ─────────────────────────

/** My Properties list — [listings.tsx](<../../app/(landlord)/(tabs)/listings.tsx>) */
export type PropertyStatusUi = 'active' | 'draft' | 'paused' | 'archived';

/** Visit Requests tabs — [requests.tsx](<../../app/(landlord)/(tabs)/requests.tsx>) */
export type RequestStatusUi = 'pending' | 'accepted';

/** Visit History pills — [visits.tsx](<../../app/(landlord)/visits.tsx>) */
export type VisitStatusLabel =
  | 'Pending Approval'
  | 'Scheduled'
  | 'Completed'
  | 'Cancelled';

// ─── Domain models (camelCase, screen-facing) ────────────────────────────────

/** A landlord's own property, as returned by `getMyProperties`. */
export interface LandlordPropertySummary {
  id:          string;
  title:       string;
  /** Public location tier only. */
  locationArea: string;
  price:       number;
  propertyType: PropertyType;
  /** Raw DB status — kept so callers can distinguish OCCUPIED / HIGH_DEMAND. */
  status:      PropertyStatus;
  /** Collapsed status for the list UI. */
  statusUi:    PropertyStatusUi;
  isDraft:     boolean;
  isDeleted:   boolean;
  photoUrls:   string[];
  views:       number;
  /** Count of non-terminal visit requests on this property. */
  requests:    number;
  createdAt:   string;
}

/** Full property detail — public tier. Never carries private location. */
export interface PropertyPublic {
  id:            string;
  landlordId:    string;
  title:         string;
  description:   string | null;
  propertyType:  PropertyType;
  price:         number;
  deposit:       number | null;
  status:        PropertyStatus;
  furnishing:    string | null;
  bedrooms:      number | null;
  bathrooms:     number | null;
  areaSqft:      number | null;
  floor:         number | null;
  totalFloors:   number | null;
  amenities:     string[];
  photoUrls:     string[];
  availableFrom: string;
  locationArea:  string;
  extraDetails:  Record<string, unknown>;
  isPaused:      boolean;
  views:         number;
  createdAt:     string;
}

/** Private location tier — only ever populated post-accept. */
export interface PropertyPrivateLocation {
  locationAddress: string | null;
  locationLat:     number | null;
  locationLng:     number | null;
}

/** Public tier + private location, from `getPropertyWithUnlockedLocation`. */
export type PropertyUnlocked = PropertyPublic & PropertyPrivateLocation;

/** A visit request joined with the bits the landlord screens display. */
export interface LandlordVisitRequest {
  id:               string;
  propertyId:       string;
  tenantId:         string;
  landlordId:       string;
  status:           VisitStatus;
  statusUi:         RequestStatusUi;
  statusLabel:      VisitStatusLabel;
  /** ISO date (`YYYY-MM-DD`). */
  requestedDate:    string;
  timeSlot:         TimeSlot;
  note:             string | null;
  rescheduleCount:  number;
  landlordResponseNote: string | null;
  createdAt:        string;
  /** Joined display fields — null when the join row is missing. */
  tenantName:       string | null;
  tenantAvatarUrl:  string | null;
  propertyTitle:    string | null;
  propertyArea:     string | null;
}

// ─── Mappers: DB → UI vocabulary ─────────────────────────────────────────────

/**
 * Collapse a property row into the My Properties list vocabulary.
 *
 * Soft-delete wins over draft (an archived draft reads as archived), then
 * pause, then draft, then the live status. `is_paused` is its own state and
 * wins over OCCUPIED — a paused AVAILABLE listing reads as `paused`, not
 * `paused` because of occupancy. Every other live status (AVAILABLE /
 * HIGH_DEMAND / UNDER_DISCUSSION) is `active`.
 */
export const toPropertyStatusUi = (
  status:    PropertyStatus,
  isDraft:   boolean,
  isPaused:  boolean,
  isDeleted: boolean
): PropertyStatusUi => {
  if (isDeleted) return 'archived';
  if (isDraft)   return 'draft';
  if (isPaused)  return 'paused';
  return status === 'OCCUPIED' ? 'paused' : 'active';
};

/**
 * Two-state vocabulary for the Visit Requests tabs. Only PENDING reads as
 * `pending`; everything the landlord has already acted on reads as `accepted`
 * (the tab screen has no third bucket today).
 */
export const toRequestStatusUi = (status: VisitStatus): RequestStatusUi =>
  status === 'PENDING' ? 'pending' : 'accepted';

/** Human label for the Visit History pills. */
export const toVisitStatusLabel = (status: VisitStatus): VisitStatusLabel => {
  switch (status) {
    case 'PENDING':
      return 'Pending Approval';
    case 'ACCEPTED':
    case 'RESCHEDULED':
    case 'DISCUSSION_ONGOING':
      return 'Scheduled';
    case 'VISIT_COMPLETED':
    case 'RENTAL_FINALIZED':
      return 'Completed';
    case 'REJECTED':
    case 'CLOSED':
      return 'Cancelled';
    default:
      return 'Pending Approval';
  }
};

/** Statuses that still count as an open request against a property. */
export const OPEN_VISIT_STATUSES: VisitStatus[] = [
  'PENDING',
  'ACCEPTED',
  'RESCHEDULED',
  'DISCUSSION_ONGOING',
];

/** Display window for each slot enum. Matches the tenant-facing copy. */
export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  MORNING:   '9:00 AM - 12:00 PM',
  AFTERNOON: '12:00 PM - 4:00 PM',
  EVENING:   '4:00 PM - 7:00 PM',
};

/**
 * Bucket a clock time (as shown in the suggest-time picker) into a slot enum.
 * The DB stores coarse slots, the picker offers exact times — this is the
 * lossy step, and it lives here rather than in the screen.
 */
export const toTimeSlot = (label: string): TimeSlot => {
  const isPm  = /pm/i.test(label);
  const hour  = parseInt(label, 10) % 12;
  const hour24 = isPm ? hour + 12 : hour;
  if (hour24 < 12) return 'MORNING';
  return hour24 < 16 ? 'AFTERNOON' : 'EVENING';
};

/** Wizard `propertyType` label → DB enum. Studio has no enum member → FLAT. */
export const toPropertyType = (wizardValue: string): PropertyType => {
  switch (wizardValue.trim().toLowerCase()) {
    case 'apartment': return 'APARTMENT';
    case 'house':     return 'HOUSE';
    case 'room':      return 'ROOM';
    case 'office':    return 'OFFICE';
    case 'studio':    // Studio is modelled as a FLAT — no STUDIO enum member.
    case 'flat':      return 'FLAT';
    default:          return 'APARTMENT';
  }
};

/** Human label for a DB property type (inverse of `toPropertyType`). */
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  ROOM:      'Room',
  APARTMENT: 'Apartment',
  HOUSE:     'House',
  OFFICE:    'Office',
  FLAT:      'Flat',
};

// ─── Mappers: DB row → domain model ──────────────────────────────────────────

/** `amenities` / `extra_details` are `jsonb`, so they arrive as `Json`. */
const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];

const asRecord = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

export const toLandlordPropertySummary = (
  row:          PropertyRow,
  requestCount = 0
): LandlordPropertySummary => ({
  id:           row.id,
  title:        row.title,
  locationArea: row.location_area,
  price:        row.price,
  propertyType: row.property_type,
  status:       row.status,
  statusUi:     toPropertyStatusUi(row.status, row.is_draft, row.is_paused, row.is_deleted),
  isDraft:      row.is_draft,
  isDeleted:    row.is_deleted,
  photoUrls:    row.photo_urls,
  views:        row.views,
  requests:     requestCount,
  createdAt:    row.created_at,
});

/**
 * Map a property row to the public tier. Deliberately does NOT read
 * `location_address` / `location_lat` / `location_lng` — see Part F of the
 * plan: the private tier is only ever exposed via `toPropertyUnlocked`.
 */
export const toPropertyPublic = (row: PropertyRow): PropertyPublic => ({
  id:            row.id,
  landlordId:    row.landlord_id,
  title:         row.title,
  description:   row.description,
  propertyType:  row.property_type,
  price:         row.price,
  deposit:       row.deposit,
  status:        row.status,
  furnishing:    row.furnishing,
  bedrooms:      row.bedrooms,
  bathrooms:     row.bathrooms,
  areaSqft:      row.area_sqft,
  floor:         row.floor,
  totalFloors:   row.total_floors,
  amenities:     asStringArray(row.amenities),
  photoUrls:     row.photo_urls,
  availableFrom: row.available_from,
  locationArea:  row.location_area,
  extraDetails:  asRecord(row.extra_details),
  isPaused:      row.is_paused,
  views:         row.views,
  createdAt:     row.created_at,
});

/** Public tier + the private location columns. Post-accept / share only. */
export const toPropertyUnlocked = (row: PropertyRow): PropertyUnlocked => ({
  ...toPropertyPublic(row),
  locationAddress: row.location_address,
  locationLat:     row.location_lat,
  locationLng:     row.location_lng,
});

/** Shape of the joined columns `visits.service` selects alongside a request. */
export interface VisitRequestJoins {
  tenant?:   { full_name: string | null; avatar_url: string | null } | null;
  property?: { title: string; location_area: string } | null;
}

export const toLandlordVisitRequest = (
  row: VisitRequestRow & VisitRequestJoins
): LandlordVisitRequest => ({
  id:                   row.id,
  propertyId:           row.property_id,
  tenantId:             row.tenant_id,
  landlordId:           row.landlord_id,
  status:               row.status,
  statusUi:             toRequestStatusUi(row.status),
  statusLabel:          toVisitStatusLabel(row.status),
  requestedDate:        row.requested_date,
  timeSlot:             row.time_slot,
  note:                 row.note,
  rescheduleCount:      row.reschedule_count,
  landlordResponseNote: row.landlord_response_note,
  createdAt:            row.created_at,
  tenantName:           row.tenant?.full_name ?? null,
  tenantAvatarUrl:      row.tenant?.avatar_url ?? null,
  propertyTitle:        row.property?.title ?? null,
  propertyArea:         row.property?.location_area ?? null,
});

// ─── Display formatters ──────────────────────────────────────────────────────

const PRICE_FORMATTER = new Intl.NumberFormat('en-IN');

/** `28000` → `"NPR 28,000/mo"` — matches the existing listings copy. */
export const formatMonthlyPrice = (price: number): string =>
  `NPR ${PRICE_FORMATTER.format(price)}/mo`;

/** ISO `YYYY-MM-DD` → `"June 15, 2026"`. */
export const formatVisitDate = (isoDate: string): string => {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  });
};

/**
 * Parse the wizard's `availableFrom` display string (`"Jul 1, 2026"`) into an
 * ISO date for the `available_from DATE NOT NULL` column. Falls back to today
 * so publish never fails on an unparseable label.
 */
export const parseAvailableFrom = (label: string | undefined): string => {
  const parsed = label ? new Date(label) : new Date();
  const date   = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  return date.toISOString().slice(0, 10);
};

/** Wizard money strings arrive comma-formatted (`"28,000"`). */
export const parseMoney = (value: string | undefined): number => {
  const digits = (value ?? '').replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
};

/** Optional integer field from a wizard param. */
export const parseOptionalInt = (value: string | undefined): number | null => {
  const digits = (value ?? '').replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : null;
};
