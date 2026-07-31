import { useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Navigation, MapPin } from 'lucide-react-native';

import { AppMapView, type MapMarkerData } from '@/src/components/map/AppMap';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import { useLocation } from '@/src/hooks/useLocation';
import { useListingLocationStore } from '@/src/store/listingLocationStore';
import { tokens } from '@/src/theme/tokens';

const { color, space, radius, font, size } = tokens;

const DEFAULT_LOCATION = {
  latitude: 27.7172,
  longitude: 85.324,
};

export default function LandlordLocationPicker() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lat?: string; lng?: string; area?: string }>();
  const insets = useSafeAreaInsets();
  const supabase = useClerkSupabase();
  const { getCurrentLocation, permissionDenied } = useLocation();
  const setLocationStore = useListingLocationStore((s) => s.setLocation);

  const [markerCoords, setMarkerCoords] = useState(() => {
    const lat = parseFloat(params.lat ?? '');
    const lng = parseFloat(params.lng ?? '');
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      return { latitude: lat, longitude: lng };
    }
    return DEFAULT_LOCATION;
  });
  const [locality, setLocality] = useState(params.area ?? '');
  const [locating, setLocating] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const handleMapClick = useCallback(async (coords: { latitude: number; longitude: number }) => {
    setMarkerCoords({ latitude: coords.latitude, longitude: coords.longitude });
    setGeocoding(true);
    try {
      const { data, error } = await supabase.functions.invoke('reverse-geocode', {
        body: { latitude: coords.latitude, longitude: coords.longitude },
      });
      if (!error && data?.area) {
        setLocality(data.area);
      }
    } catch {
    }
    setGeocoding(false);
  }, [supabase]);

  const handleLocateMe = useCallback(async () => {
    if (locating) return;
    setLocating(true);
    const loc = await getCurrentLocation();
    if (loc) {
      setMarkerCoords({ latitude: loc.latitude, longitude: loc.longitude });
      handleMapClick(loc);
    }
    setLocating(false);
  }, [locating, getCurrentLocation, handleMapClick]);

  const handleConfirm = useCallback(() => {
    setLocationStore({
      lat: markerCoords.latitude,
      lng: markerCoords.longitude,
      area: locality,
    });
    router.back();
  }, [markerCoords, locality, setLocationStore, router]);

  const markers: MapMarkerData[] = useMemo(
    () => [
      {
        id: 'pin',
        latitude: markerCoords.latitude,
        longitude: markerCoords.longitude,
        draggable: true,
        title: locality || 'Property location',
        color: color.brand,
        zIndex: 10,
      },
    ],
    [markerCoords, locality],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Go back">
          <ArrowLeft size={18} color={color.ink} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Set Location</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <AppMapView
          style={{ flex: 1 }}
          cameraPosition={{
            latitude: markerCoords.latitude,
            longitude: markerCoords.longitude,
            zoom: 15,
          }}
          markers={markers}
          isMyLocationEnabled={false}
          onMapClick={handleMapClick}
        />

        {permissionDenied && (
          <View pointerEvents="none" style={styles.permissionBanner}>
            <MapPin size={14} color={color.warn} />
            <Text style={styles.permissionText}>
              Search manually — Enable Location
            </Text>
          </View>
        )}

        <Pressable
          onPress={handleLocateMe}
          disabled={locating}
          style={styles.locateButton}
          accessibilityLabel="Locate my position"
          accessibilityRole="button">
          {locating ? (
            <ActivityIndicator size="small" color={color.ink} />
          ) : (
            <Navigation size={20} color={color.ink} />
          )}
        </Pressable>
      </View>

      <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <View style={styles.coordsRow}>
          <View style={styles.coordChip}>
            <Text style={styles.coordLabel}>Latitude</Text>
            <Text style={styles.coordValue}>{markerCoords.latitude.toFixed(6)}</Text>
          </View>
          <View style={styles.coordChip}>
            <Text style={styles.coordLabel}>Longitude</Text>
            <Text style={styles.coordValue}>{markerCoords.longitude.toFixed(6)}</Text>
          </View>
        </View>

        <Text style={styles.fieldLabel}>Location area</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={locality}
            onChangeText={setLocality}
            placeholder="e.g. Baluwatar, Kathmandu"
            placeholderTextColor={color.placeholder}
            editable={!geocoding}
          />
          {geocoding && (
            <ActivityIndicator size="small" color={color.ink2} style={{ position: 'absolute', right: 14 }} />
          )}
        </View>

        <Text style={styles.hint}>
          Tap on the map to set the pin location. Drag the pin to fine-tune.
        </Text>

        <Pressable
          onPress={handleConfirm}
          style={styles.confirmButton}
          accessibilityLabel="Confirm location"
          accessibilityRole="button">
          <Text style={styles.confirmText}>Confirm Location</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  header: {
    height: space.headerH,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    paddingHorizontal: space.screenH,
  },
  backButton: {
    width: 40, height: 40, borderRadius: radius.pill,
    backgroundColor: color.input, alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center', paddingRight: 40 },
  headerTitle: { fontFamily: font.semibold, fontSize: 17, color: color.ink },
  mapContainer: { flex: 1 },
  permissionBanner: {
    position: 'absolute', top: 12, left: 16, right: 16,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: color.warnBg, borderRadius: radius.card,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  permissionText: { fontFamily: font.sans, fontSize: size.caption, color: color.warn },
  locateButton: {
    position: 'absolute', right: 16, bottom: 16,
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: color.bg,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18, shadowRadius: 8, elevation: 6,
  },
  bottomSheet: {
    backgroundColor: color.bg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: space.screenH,
    paddingTop: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 8,
  },
  coordsRow: {
    flexDirection: 'row', gap: 10, marginBottom: 16,
  },
  coordChip: {
    flex: 1,
    backgroundColor: color.input,
    borderRadius: radius.sm,
    padding: 10,
  },
  coordLabel: {
    fontFamily: font.sans, fontSize: size.micro,
    color: color.ink3, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  coordValue: {
    fontFamily: font.medium, fontSize: size.caption, color: color.ink,
    marginTop: 2,
  },
  fieldLabel: {
    fontFamily: font.semibold, fontSize: size.bodySm,
    color: color.ink, marginBottom: 6,
  },
  inputRow: { position: 'relative' },
  input: {
    height: 52,
    borderRadius: radius.card,
    backgroundColor: color.input,
    paddingHorizontal: 14,
    fontFamily: font.sans, fontSize: size.body,
    color: color.ink,
  },
  hint: {
    fontFamily: font.sans, fontSize: size.caption,
    color: color.ink3, marginTop: 8,
  },
  confirmButton: {
    height: space.buttonH,
    borderRadius: radius.pill,
    backgroundColor: color.ink,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 16,
  },
  confirmText: {
    fontFamily: font.semibold, fontSize: size.body, color: color.bg,
  },
});
