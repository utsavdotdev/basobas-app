import { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';
import { useListingLocationStore } from '@/src/store/listingLocationStore';

const { color, space, radius, font, size } = tokens;

// ─── Chip data by type ───────────────────────────────────────────────────────

const FURNISHING = ['Furnished', 'Semi-furnished', 'Unfurnished'] as const;

const AMENITIES_APARTMENT = [
  'Parking', 'Water Tank', 'Backup Power', 'Internet ready',
  'Elevator', 'Balcony', 'Security',
] as const;

const AMENITIES_HOUSE = [
  'Parking', 'Water Tank', 'Backup Power', 'Internet ready',
  'Solar', 'Servant Room', 'Rooftop',
] as const;

const AMENITIES_ROOM = [
  'Wi-Fi', 'Laundry', 'Hot Water', 'Cleaning', 'Study Desk',
] as const;

const AMENITIES_STUDIO = [
  'Parking', 'Water Tank', 'Backup Power', 'Internet ready',
  'Murphy bed', 'Balcony',
] as const;

const BATHROOM_OPTIONS = ['Attached', 'Common'] as const;
const KITCHEN_OPTIONS = ['Private', 'Shared', 'Not included'] as const;
const TENANT_OPTIONS = ['Any', 'Male', 'Female', 'Family', 'Students'] as const;
const KITCHENETTE_OPTIONS = ['Open', 'Closed', 'None'] as const;

// ─── Toggle component ────────────────────────────────────────────────────────

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (      <Pressable
          onPress={onToggle}
          style={[styles.toggleTrack, enabled && styles.toggleTrackActive]}
          accessibilityRole="switch"
          accessibilityState={{ selected: enabled }}>
        <View style={styles.toggleThumb} />
      </Pressable>
  );
}

// ─── Chip selector ──────────────────────────────────────────────────────────

function ChipGroup<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: readonly T[];
  selected: T;
  onSelect: (v: T) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {options.map((o) => {
        const active = o === selected;
        return (
          <Pressable
            key={o}
            onPress={() => onSelect(o)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function NewListingStep2() {
  const router = useRouter();
  const { propertyType } = useLocalSearchParams<{ propertyType: string }>();
  const pt = (propertyType ?? 'Apartment') as 'Apartment' | 'House' | 'Room' | 'Studio';

  // ── Common state ──────────────────────────────────────────────────────────
  const [title, setTitle] = useState('2BHK Apartment in Baluwatar');
  const [rent, setRent] = useState('28,000');
  const [deposit, setDeposit] = useState('56,000');
  const [location, setLocation] = useState('Baluwatar, Kathmandu');
  const [availableFrom, setAvailableFrom] = useState('Jul 1, 2026');
  const [furnishing, setFurnishing] = useState<string>('Semi-furnished');

  // Map-picker location (lat/lng) — synced from the picker screen via store.
  const mapLocation = useListingLocationStore((s) => ({ lat: s.lat, lng: s.lng, area: s.area }));

  useFocusEffect(
    useCallback(() => {
      if (mapLocation.lat != null && mapLocation.lng != null) {
        setLocation(mapLocation.area || location);
      }
    }, [mapLocation.lat, mapLocation.lng, mapLocation.area, location]),
  );

  const hasMapPin = mapLocation.lat != null && mapLocation.lng != null;

  const handlePickOnMap = useCallback(() => {
    router.push({
      pathname: '/(landlord)/location-picker',
      params: {
        lat: hasMapPin ? String(mapLocation.lat) : undefined,
        lng: hasMapPin ? String(mapLocation.lng) : undefined,
        area: mapLocation.area,
      },
    } as any);
  }, [router, hasMapPin, mapLocation.lat, mapLocation.lng, mapLocation.area]);

  // ── Apartment state ─────────────────────────────────────────────────────
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [area, setArea] = useState('850');
  const [floor, setFloor] = useState('3');
  const [totalFloors, setTotalFloors] = useState('5');
  const [amenities, setAmenities] = useState<string[]>(['Parking', 'Water Tank', 'Balcony']);

  // ── House state ─────────────────────────────────────────────────────────
  const [houseBedrooms, setHouseBedrooms] = useState(3);
  const [houseBathrooms, setHouseBathrooms] = useState(2);
  const [builtUpArea, setBuiltUpArea] = useState('1200');
  const [houseFloors, setHouseFloors] = useState('2');
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [hasGarden, setHasGarden] = useState(false);
  const [hasGated, setHasGated] = useState(false);
  const [houseAmenities, setHouseAmenities] = useState<string[]>(['Parking', 'Water Tank', 'Rooftop']);

  // ── Room state ──────────────────────────────────────────────────────────
  const [roomBathroom, setRoomBathroom] = useState<string>('Attached');
  const [kitchenAccess, setKitchenAccess] = useState<string>('Shared');
  const [tenantPref, setTenantPref] = useState<string>('Any');
  const [roomAmenities, setRoomAmenities] = useState<string[]>(['Wi-Fi', 'Hot Water']);

  // ── Studio state ────────────────────────────────────────────────────────
  const [studioArea, setStudioArea] = useState('450');
  const [studioFloor, setStudioFloor] = useState('2');
  const [kitchenette, setKitchenette] = useState<string>('Open');
  const [studioBathroom, setStudioBathroom] = useState<string>('Attached');
  const [studioAmenities, setStudioAmenities] = useState<string[]>(['Water Tank', 'Balcony']);

  // ── Toggle helpers ───────────────────────────────────────────────────────
  const toggleAmenity = useCallback((a: string, list: string[], set: (v: string[]) => void) => {
    set(list.includes(a) ? list.filter((x) => x !== a) : [...list, a]);
  }, []);

  const handleGoBack = useCallback(() => router.back(), [router]);

  // ── Build params for next step ──────────────────────────────────────────
  const handleContinue = useCallback(() => {
    const base = {
      propertyType: pt,
      title,
      rent,
      deposit,
      location,
      availableFrom,
      furnishing,
      mapLat: hasMapPin ? String(mapLocation.lat) : undefined,
      mapLng: hasMapPin ? String(mapLocation.lng) : undefined,
    };

    let extra: Record<string, string> = {};

    if (pt === 'Apartment') {
      extra = {
        bedrooms: bedrooms.toString(),
        bathrooms: bathrooms.toString(),
        area,
        floor,
        totalFloors,
        amenities: JSON.stringify(amenities),
      };
    } else if (pt === 'House') {
      extra = {
        bedrooms: houseBedrooms.toString(),
        bathrooms: houseBathrooms.toString(),
        builtUpArea,
        houseFloors,
        parkingSpaces: parkingSpaces.toString(),
        hasGarden: hasGarden.toString(),
        hasGated: hasGated.toString(),
        amenities: JSON.stringify(houseAmenities),
      };
    } else if (pt === 'Room') {
      extra = {
        roomBathroom,
        kitchenAccess,
        tenantPref,
        amenities: JSON.stringify(roomAmenities),
      };
    } else if (pt === 'Studio') {
      extra = {
        studioArea,
        studioFloor,
        kitchenette,
        studioBathroom,
        amenities: JSON.stringify(studioAmenities),
      };
    }

    router.push({
      pathname: '/(landlord)/listing/new/step-3',
      params: { ...base, ...extra },
    } as any);
  }, [
    router, pt, title, rent, deposit, location, availableFrom, furnishing,
    hasMapPin, mapLocation.lat, mapLocation.lng,
    bedrooms, bathrooms, area, floor, totalFloors, amenities,
    houseBedrooms, houseBathrooms, builtUpArea, houseFloors, parkingSpaces, hasGarden, hasGated, houseAmenities,
    roomBathroom, kitchenAccess, tenantPref, roomAmenities,
    studioArea, studioFloor, kitchenette, studioBathroom, studioAmenities,
  ]);

  // ── Render type-specific fields ─────────────────────────────────────────

  const renderApartmentFields = () => (
    <>
      {/* Bedrooms + Bathrooms */}
      <View style={styles.row2}>
        <StepperField label="Bedrooms" value={bedrooms} onChange={setBedrooms} />
        <StepperField label="Bathrooms" value={bathrooms} onChange={setBathrooms} />
      </View>

      {/* Area + Floor + Total floors */}
      <Text style={styles.fieldLabel}>Area (sqft), Floor, Total floors</Text>
      <View style={styles.row3}>
        <TextInput style={[styles.input, { flex: 1 }]} value={area} onChangeText={setArea} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        <TextInput style={[styles.input, { flex: 1 }]} value={floor} onChangeText={setFloor} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        <TextInput style={[styles.input, { flex: 1 }]} value={totalFloors} onChangeText={setTotalFloors} keyboardType="numeric" placeholderTextColor={color.placeholder} />
      </View>

      {/* Amenities */}
      <Text style={styles.fieldLabel}>Amenities</Text>
      <View style={styles.chipRow}>
        {AMENITIES_APARTMENT.map((a) => {
          const active = amenities.includes(a);
          return (
            <Pressable key={a} onPress={() => toggleAmenity(a, amenities, setAmenities)}
              style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{a}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

  const renderHouseFields = () => (
    <>
      {/* Bedrooms + Bathrooms + Parking spaces */}
      <View style={styles.row2}>
        <StepperField label="Bedrooms" value={houseBedrooms} onChange={setHouseBedrooms} />
        <StepperField label="Bathrooms" value={houseBathrooms} onChange={setHouseBathrooms} />
      </View>

      {/* Built-up area + Floors */}
      <View style={styles.row2}>
        <View style={styles.halfField}>
          <Text style={styles.fieldLabel}>Built-up area (sqft)</Text>
          <TextInput style={styles.input} value={builtUpArea} onChangeText={setBuiltUpArea} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.fieldLabel}>Floors in house</Text>
          <TextInput style={styles.input} value={houseFloors} onChangeText={setHouseFloors} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        </View>
      </View>

      <StepperField label="Parking spaces" value={parkingSpaces} onChange={setParkingSpaces} />

      {/* Feature toggles */}
      <Text style={styles.fieldLabel}>Features</Text>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Private garden / yard</Text>
        <Toggle enabled={hasGarden} onToggle={() => setHasGarden((v) => !v)} />
      </View>
      <View style={[styles.toggleRow, { marginTop: 0 }]}>
        <Text style={styles.toggleLabel}>Gated compound</Text>
        <Toggle enabled={hasGated} onToggle={() => setHasGated((v) => !v)} />
      </View>

      {/* Amenities */}
      <Text style={styles.fieldLabel}>Amenities</Text>
      <View style={styles.chipRow}>
        {AMENITIES_HOUSE.map((a) => {
          const active = houseAmenities.includes(a);
          return (
            <Pressable key={a} onPress={() => toggleAmenity(a, houseAmenities, setHouseAmenities)}
              style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{a}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

  const renderRoomFields = () => (
    <>
      <Text style={styles.fieldLabel}>Bathroom</Text>
      <ChipGroup options={BATHROOM_OPTIONS} selected={roomBathroom} onSelect={setRoomBathroom} />

      <Text style={styles.fieldLabel}>Kitchen access</Text>
      <ChipGroup options={KITCHEN_OPTIONS} selected={kitchenAccess} onSelect={setKitchenAccess} />

      <Text style={styles.fieldLabel}>Tenant preference</Text>
      <ChipGroup options={TENANT_OPTIONS} selected={tenantPref} onSelect={setTenantPref} />

      {/* Amenities */}
      <Text style={styles.fieldLabel}>Amenities</Text>
      <View style={styles.chipRow}>
        {AMENITIES_ROOM.map((a) => {
          const active = roomAmenities.includes(a);
          return (
            <Pressable key={a} onPress={() => toggleAmenity(a, roomAmenities, setRoomAmenities)}
              style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{a}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

  const renderStudioFields = () => (
    <>
      {/* Area + Floor */}
      <View style={styles.row2}>
        <View style={styles.halfField}>
          <Text style={styles.fieldLabel}>Area (sqft)</Text>
          <TextInput style={styles.input} value={studioArea} onChangeText={setStudioArea} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.fieldLabel}>Floor</Text>
          <TextInput style={styles.input} value={studioFloor} onChangeText={setStudioFloor} keyboardType="numeric" placeholderTextColor={color.placeholder} />
        </View>
      </View>

      <Text style={styles.fieldLabel}>Kitchenette</Text>
      <ChipGroup options={KITCHENETTE_OPTIONS} selected={kitchenette} onSelect={setKitchenette} />

      <Text style={styles.fieldLabel}>Bathroom</Text>
      <ChipGroup options={BATHROOM_OPTIONS} selected={studioBathroom} onSelect={setStudioBathroom} />

      {/* Amenities */}
      <Text style={styles.fieldLabel}>Amenities</Text>
      <View style={styles.chipRow}>
        {AMENITIES_STUDIO.map((a) => {
          const active = studioAmenities.includes(a);
          return (
            <Pressable key={a} onPress={() => toggleAmenity(a, studioAmenities, setStudioAmenities)}
              style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{a}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable onPress={handleGoBack} style={styles.backButton} accessibilityLabel="Go back">
          <ArrowLeft size={18} color={color.ink} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>New Listing</Text>
        </View>
      </View>

      {/* ─── Progress Bar ────────────────────────────────────────────── */}
      <View style={styles.progressSection}>
        <Text style={styles.stepLabel}>Step 2 of 4</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ─── Headline ──────────────────────────────────────────────── */}
        <Text style={styles.headline}>About your {pt.toLowerCase()}</Text>
        <Text style={styles.subtext}>Fields tailored to a {pt.toLowerCase()}.</Text>

        {/* ─── Common fields ─────────────────────────────────────────── */}
        <Text style={styles.fieldLabel}>Listing title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholderTextColor={color.placeholder} />

        <View style={styles.row2}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Monthly rent (NPR)</Text>
            <TextInput style={styles.input} value={rent} onChangeText={setRent} keyboardType="numeric" placeholderTextColor={color.placeholder} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Deposit (NPR)</Text>
            <TextInput style={styles.input} value={deposit} onChangeText={setDeposit} keyboardType="numeric" placeholderTextColor={color.placeholder} />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Location</Text>
        <View style={styles.locationRow}>
          <TextInput
            style={[styles.input, styles.locationInput]}
            value={location}
            onChangeText={setLocation}
            placeholderTextColor={color.placeholder}
          />
          <Pressable
            onPress={handlePickOnMap}
            style={[styles.mapPickButton, hasMapPin && styles.mapPickButtonActive]}
            accessibilityLabel="Pick location on map"
            accessibilityRole="button">
            {hasMapPin ? (
              <Navigation size={18} color={color.bg} />
            ) : (
              <MapPin size={18} color={color.ink} />
            )}
            <Text style={[styles.mapPickText, hasMapPin && styles.mapPickTextActive]}>
              {hasMapPin ? 'Picked' : 'Map'}
            </Text>
          </Pressable>
        </View>
        {hasMapPin && (
          <Text style={styles.mapHint}>
            Pin set at {mapLocation.lat!.toFixed(5)}, {mapLocation.lng!.toFixed(5)}
          </Text>
        )}

        <Text style={styles.fieldLabel}>Available from</Text>
        <TextInput style={styles.input} value={availableFrom} onChangeText={setAvailableFrom} placeholderTextColor={color.placeholder} />

        {/* ─── Type-specific fields ──────────────────────────────────── */}
        {pt === 'Apartment' && renderApartmentFields()}
        {pt === 'House' && renderHouseFields()}
        {pt === 'Room' && renderRoomFields()}
        {pt === 'Studio' && renderStudioFields()}

        {/* ─── Furnishing (common, after type fields) ──────────────────── */}
        <Text style={styles.fieldLabel}>Furnishing</Text>
        <ChipGroup options={FURNISHING} selected={furnishing} onSelect={setFurnishing} />
      </ScrollView>

      {/* ─── Sticky Bottom ────────────────────────────────────────────── */}
      <View style={styles.bottomArea}>
        <Pressable onPress={handleContinue} style={styles.cta} accessibilityLabel="Continue" accessibilityRole="button">
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ─── Stepper field sub-component ────────────────────────────────────────────

function StepperField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.halfField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable onPress={() => onChange(Math.max(0, value - 1))} style={styles.stepperBtn}>
          <Text style={styles.stepperBtnText}>-</Text>
        </Pressable>
        <Text style={styles.stepperValue}>{value}</Text>
        <Pressable onPress={() => onChange(value + 1)} style={styles.stepperBtn}>
          <Text style={styles.stepperBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.bg,
  },
  header: {
    height: space.headerH,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    paddingHorizontal: space.screenH,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 40,
  },
  headerTitle: {
    fontFamily: font.semibold,
    fontSize: 17,
    color: color.ink,
  },
  progressSection: {
    paddingHorizontal: space.screenH,
    paddingTop: 12,
    paddingBottom: 4,
  },
  stepLabel: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
    marginBottom: 8,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: color.line,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: color.ink,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: space.screenH,
    paddingTop: 28,
    paddingBottom: 24,
  },
  headline: {
    fontFamily: font.display,
    fontSize: 28,
    color: color.ink,
    marginBottom: 6,
  },
  subtext: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: color.ink2,
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: color.ink,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    height: 52,
    borderRadius: radius.card,
    backgroundColor: color.input,
    paddingHorizontal: 14,
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink,
  },
  locationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  locationInput: {
    flex: 1,
  },
  mapPickButton: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapPickButtonActive: {
    backgroundColor: color.ink,
    borderColor: color.ink,
  },
  mapPickText: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: color.ink,
  },
  mapPickTextActive: {
    color: color.bg,
  },
  mapHint: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
    marginTop: 6,
  },
  row2: {
    flexDirection: 'row',
    gap: 10,
  },
  halfField: { flex: 1 },
  row3: { flexDirection: 'row', gap: 8 },
  stepper: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.card,
    backgroundColor: color.input,
    paddingHorizontal: 6,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.bg,
    borderWidth: 1,
    borderColor: color.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontFamily: font.semibold,
    fontSize: 17,
    color: color.ink,
  },
  stepperValue: {
    fontFamily: font.bold,
    fontSize: size.h3,
    color: color.ink,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: color.ink,
    borderColor: color.ink,
  },
  chipText: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: color.ink,
  },
  chipTextActive: {
    fontFamily: font.semibold,
    color: color.bg,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingVertical: 8,
  },
  toggleLabel: {
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink,
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: color.ink3,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackActive: {
    backgroundColor: color.ink,
    justifyContent: 'flex-end',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: color.bg,
  },
  bottomArea: {
    paddingHorizontal: space.screenH,
    paddingBottom: space.safeBottom + 8,
    paddingTop: 8,
  },
  cta: {
    height: space.buttonH,
    borderRadius: radius.pill,
    backgroundColor: color.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.bg,
  },
});
