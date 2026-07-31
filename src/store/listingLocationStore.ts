import { create } from 'zustand'

/**
 * Map-picker location for the listing wizard.
 *
 * The landlord location-picker screen writes lat/lng + the reverse-geocoded
 * area here, and step-2 reads it back when the user returns from the map.
 * Kept separate from propertyStore because it's wizard-scoped state.
 */
interface ListingLocationState {
  lat: number | null
  lng: number | null
  area: string
  setLocation: (loc: { lat: number; lng: number; area: string }) => void
  clear: () => void
}

export const useListingLocationStore = create<ListingLocationState>((set) => ({
  lat: null,
  lng: null,
  area: '',

  setLocation: ({ lat, lng, area }) => set({ lat, lng, area }),

  clear: () => set({ lat: null, lng: null, area: '' }),
}))
