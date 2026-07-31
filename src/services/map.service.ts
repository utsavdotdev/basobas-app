import type { SupabaseClient } from '@supabase/supabase-js';
import { ok, err, getErrorMessage, type Result } from '@/src/lib/result';
import type { Database } from '@/src/types/database.types';
import type { MapBounds, PropertyPin } from '@/src/types/map.types';

type PropertyRow = Record<string, unknown>;

function toPropertyPin(row: PropertyRow): PropertyPin {
  return {
    id: row.id as string,
    latitude: row.location_lat as number,
    longitude: row.location_lng as number,
    price: row.price as number,
    status: (row.status as PropertyPin['status']) ?? 'AVAILABLE',
    title: row.title as string,
    photoUrl: ((row.photo_urls as string[])?.[0]) ?? undefined,
    locationArea: row.location_area as string,
    propertyType: row.property_type as string,
  };
}

export async function getPropertiesInBounds(
  bounds: MapBounds,
  supabase: SupabaseClient<Database>,
): Promise<Result<PropertyPin[]>> {
  try {
    const { data, error } = await supabase.rpc('get_properties_in_bounds' as any, {
      p_sw_lat: bounds.swLat,
      p_sw_lng: bounds.swLng,
      p_ne_lat: bounds.neLat,
      p_ne_lng: bounds.neLng,
    });

    if (error) return err(getErrorMessage(error));

    const rows = (data ?? []) as PropertyRow[];
    return ok(rows.map(toPropertyPin));
  } catch (e) {
    return err(getErrorMessage(e));
  }
}

/**
 * Every visible property within `radiusM` meters of the center point,
 * nearest first. Powers the tenant map's search → radius → list flow.
 */
export async function getPropertiesNear(
  lat: number,
  lng: number,
  radiusM: number,
  supabase: SupabaseClient<Database>,
): Promise<Result<PropertyPin[]>> {
  try {
    const { data, error } = await supabase.rpc('get_properties_near' as any, {
      p_lat: lat,
      p_lng: lng,
      p_radius_m: radiusM,
    });

    if (error) return err(getErrorMessage(error));

    const rows = (data ?? []) as PropertyRow[];
    return ok(rows.map(toPropertyPin));
  } catch (e) {
    return err(getErrorMessage(e));
  }
}

export async function searchProperties(
  query: string,
  supabase: SupabaseClient<Database>,
): Promise<Result<PropertyPin[]>> {
  try {
    const { data, error } = await supabase.rpc('search_properties' as any, {
      p_query: query,
    });

    if (error) return err(getErrorMessage(error));

    const rows = (data ?? []) as Record<string, unknown>[];
    return ok(
      rows.map((row) => ({
        id: row.id as string,
        latitude: row.location_lat as number,
        longitude: row.location_lng as number,
        price: row.price as number,
        status: (row.status as PropertyPin['status']) ?? 'AVAILABLE',
        title: row.title as string,
        photoUrl: ((row.photo_urls as string[])?.[0]) ?? undefined,
        locationArea: row.location_area as string,
        propertyType: row.property_type as string,
      })),
    );
  } catch (e) {
    return err(getErrorMessage(e));
  }
}

export interface GeocodeResult {
  /** Human-readable place label (Nominatim display_name). */
  name: string;
  /** Short locality for the map header, e.g. "Baluwatar". */
  area: string;
  lat: number;
  lng: number;
}

/**
 * Forward-geocode a free-text place query ("Baluwatar", "Thamel,
 * Kathmandu") via the `geocode` edge function (Nominatim). Returns up
 * to 5 candidate locations to center the radius circle on.
 */
export async function geocodePlace(
  query: string,
  supabase: SupabaseClient<Database>,
): Promise<Result<GeocodeResult[]>> {
  try {
    const { data, error } = await supabase.functions.invoke('geocode', {
      body: { query },
    });

    if (error) {
      // FunctionsHttpError.context is the raw Response — surface the
      // edge function's actual reason if possible.
      let message = getErrorMessage(error);
      try {
        const ctx = (error as any)?.context;
        if (ctx && typeof ctx.json === 'function') {
          const body = await ctx.json();
          message = (body as { error?: string })?.error ?? message;
        }
      } catch {
        // fall through with the generic message
      }
      return err(message);
    }

    const results = ((data as { results?: unknown[] } | null)?.results ?? []) as GeocodeResult[];
    return ok(results);
  } catch (e) {
    return err(getErrorMessage(e));
  }
}
