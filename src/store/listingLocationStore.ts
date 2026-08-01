import { create } from 'zustand'

/**
 * Map-picker location for the listing wizard.
 *
 * The landlord location-picker screen writes lat/lng, the reverse-geocoded
 * short `area`, and the exact `address` (Nominatim display_name) here, and
 * step-2 reads it back when the user returns from the map. Kept separate
 * from propertyStore because it's wizard-scoped state.
 */
interface ListingLocationState {
  lat: number | null
  lng: number | null
  area: string
  address: string
  setLocation: (loc: { lat: number; lng: number; area: string; address: string }) => void
  clear: () => void
}

export const useListingLocationStore = create<ListingLocationState>((set) => ({
  lat: null,
  lng: null,
  area: '',
  address: '',

  setLocation: ({ lat, lng, area, address }) => set({ lat, lng, area, address }),

  clear: () => set({ lat: null, lng: null, area: '', address: '' }),
}))
