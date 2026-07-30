import { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUser } from '@clerk/expo';
import { ArrowLeft, Check, Camera } from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import {
  createPropertyDraft,
  publishProperty,
  getLandlordVerificationStatus,
} from '@/src/services/properties.service';
import { uploadPropertyPhoto } from '@/src/services/storage.service';
import {
  toPropertyType,
  parseAvailableFrom,
  parseMoney,
  parseOptionalInt,
} from '@/src/types/property.types';

const { color, space, radius, font, size } = tokens;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJSON(val: string | undefined): string[] {
  try {
    return JSON.parse(val ?? '[]');
  } catch {
    return [];
  }
}

/** Step 3 passes `photos` as a JSON array of `{ uri, type }`. */
interface MediaItem {
  uri: string;
  type: 'image' | 'video';
}

function parseMedia(val: string | undefined): MediaItem[] {
  try {
    const parsed = JSON.parse(val ?? '[]');
    return Array.isArray(parsed) ? (parsed as MediaItem[]) : [];
  } catch {
    return [];
  }
}

function countSelected(val: string | undefined): string {
  const count = parseJSON(val).length;
  return `${count} selected`;
}

// ─── Detail row type ─────────────────────────────────────────────────────────

interface DetailRow {
  label: string;
  value: string;
}

// ─── Screen ──────────────────────────────────────────────────────────────────

/**
 * Type-specific wizard fields that don't have their own column. They live in
 * `properties.extra_details` (jsonb) so a new property type doesn't need a
 * migration.
 */
function collectExtraDetails(
  p: Record<string, string>,
  pt: string,
): Record<string, unknown> {
  const extras: Record<string, unknown> = {};
  const put = (key: string, value: string | undefined) => {
    if (value !== undefined && value !== '') extras[key] = value;
  };

  if (pt === 'House') {
    put('parkingSpaces', p.parkingSpaces);
    put('houseFloors', p.houseFloors);
    if (p.hasGarden === 'true') extras.hasGarden = true;
    if (p.hasGated === 'true') extras.hasGated = true;
  } else if (pt === 'Room') {
    put('roomBathroom', p.roomBathroom);
    put('kitchenAccess', p.kitchenAccess);
    put('tenantPref', p.tenantPref);
  } else if (pt === 'Studio') {
    put('kitchenette', p.kitchenette);
    put('studioBathroom', p.studioBathroom);
    // Studio maps onto the FLAT enum — keep the original label for display.
    extras.originalType = 'Studio';
  }

  return extras;
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function NewListingStep4() {
  const router = useRouter();
  const p = useLocalSearchParams<Record<string, string>>();
  const { user } = useUser();
  const supabase = useClerkSupabase();

  const [publishing, setPublishing] = useState(false);
  const [progressLabel, setProgressLabel] = useState('Publishing…');

  const pt = (p.propertyType ?? 'Apartment') as string;
  const media = useMemo(() => parseMedia(p.photos), [p.photos]);

  // ── Build detail rows dynamically by type ───────────────────────────────
  const details = useMemo((): DetailRow[] => {
    const rows: DetailRow[] = [
      { label: 'Property type', value: pt },
      { label: 'Monthly rent', value: `NPR ${p.rent ?? '28,000'}` },
      { label: 'Deposit', value: `NPR ${p.deposit ?? '56,000'}` },
      { label: 'Location', value: p.location ?? 'Baluwatar, Kathmandu' },
      { label: 'Available from', value: p.availableFrom ?? 'Jul 1, 2026' },
      { label: 'Furnishing', value: p.furnishing ?? 'Semi-furnished' },
    ];

    if (pt === 'Apartment') {
      rows.push(
        { label: 'Bedrooms', value: p.bedrooms ?? '2' },
        { label: 'Bathrooms', value: p.bathrooms ?? '1' },
        { label: 'Area', value: `${p.area ?? '850'} sqft` },
        { label: 'Floor', value: `${p.floor ?? '3'} / ${p.totalFloors ?? '5'}` },
        { label: 'Amenities', value: countSelected(p.amenities) },
      );
    } else if (pt === 'House') {
      rows.push(
        { label: 'Bedrooms', value: p.bedrooms ?? '3' },
        { label: 'Bathrooms', value: p.bathrooms ?? '2' },
        { label: 'Built-up area', value: `${p.builtUpArea ?? '1200'} sqft` },
        { label: 'Floors', value: p.houseFloors ?? '2' },
        { label: 'Parking spaces', value: p.parkingSpaces ?? '1' },
      );
      if (p.hasGarden === 'true') rows.push({ label: 'Private garden', value: 'Yes' });
      if (p.hasGated === 'true') rows.push({ label: 'Gated compound', value: 'Yes' });
      rows.push({ label: 'Amenities', value: countSelected(p.amenities) });
    } else if (pt === 'Room') {
      rows.push(
        { label: 'Bathroom', value: p.roomBathroom ?? 'Attached' },
        { label: 'Kitchen access', value: p.kitchenAccess ?? 'Shared' },
        { label: 'Tenant preference', value: p.tenantPref ?? 'Any' },
        { label: 'Amenities', value: countSelected(p.amenities) },
      );
    } else if (pt === 'Studio') {
      rows.push(
        { label: 'Area', value: `${p.studioArea ?? '450'} sqft` },
        { label: 'Floor', value: p.studioFloor ?? '2' },
        { label: 'Kitchenette', value: p.kitchenette ?? 'Open' },
        { label: 'Bathroom', value: p.studioBathroom ?? 'Attached' },
        { label: 'Amenities', value: countSelected(p.amenities) },
      );
    }

    return rows;
  }, [pt, p]);

  const handleGoBack = useCallback(() => router.back(), [router]);

  const handlePublish = useCallback(async () => {
    const clerkId = user?.id;
    if (!clerkId) {
      Alert.alert('Not signed in', 'Please sign in again to publish this listing.');
      return;
    }
    if (publishing) return;

    setPublishing(true);
    try {
      // 1. Verification gate — an unverified landlord must not create a row.
      setProgressLabel('Checking verification…');
      const verification = await getLandlordVerificationStatus(clerkId, supabase);
      if (!verification.success) {
        Alert.alert('Could not publish', verification.error);
        return;
      }
      if (verification.data !== 'VERIFIED') {
        Alert.alert(
          'Verification required',
          verification.data === 'UNDER_REVIEW'
            ? 'Your verification is still under review. You can publish once it is approved.'
            : 'Verify your identity before publishing a listing.',
          [
            { text: 'Not now', style: 'cancel' },
            {
              text: 'Verify now',
              onPress: () => router.push('/(landlord)/verification' as any),
            },
          ],
        );
        return;
      }

      // 2. Create the draft row so photos have a property id to nest under.
      setProgressLabel('Creating listing…');
      const draft = await createPropertyDraft(
        {
          landlordId:    clerkId,
          title:         p.title ?? `${pt} in ${p.location ?? 'Kathmandu'}`,
          description:   p.description ?? null,
          propertyType:  toPropertyType(pt),
          price:         parseMoney(p.rent),
          deposit:       parseOptionalInt(p.deposit),
          furnishing:    p.furnishing ?? null,
          bedrooms:      parseOptionalInt(p.bedrooms),
          bathrooms:     parseOptionalInt(p.bathrooms),
          areaSqft:      parseOptionalInt(p.area ?? p.builtUpArea ?? p.studioArea),
          floor:         parseOptionalInt(p.floor ?? p.studioFloor),
          totalFloors:   parseOptionalInt(p.totalFloors ?? p.houseFloors),
          amenities:     parseJSON(p.amenities),
          availableFrom: parseAvailableFrom(p.availableFrom),
          locationArea:  p.location ?? '',
          extraDetails:  collectExtraDetails(p, pt),
        },
        supabase,
      );
      if (!draft.success) {
        Alert.alert('Could not publish', draft.error);
        return;
      }
      const propertyId = draft.data;

      // 3. Upload photos. The bucket is images-only, so videos from step 3 are
      //    skipped rather than silently failing mid-upload.
      const images = media.filter((m) => m.type === 'image');
      const skippedVideos = media.length - images.length;
      if (skippedVideos > 0) {
        console.warn(
          `[publish] skipping ${skippedVideos} video(s) — property-photos accepts images only`,
        );
      }

      const photoUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        setProgressLabel(`Uploading photo ${i + 1} of ${images.length}…`);
        const upload = await uploadPropertyPhoto(
          clerkId,
          propertyId,
          i,
          images[i].uri,
          supabase,
        );
        if (!upload.success) {
          // The draft row survives, so the user can retry without re-entering
          // the whole wizard.
          Alert.alert('Photo upload failed', upload.error);
          return;
        }
        photoUrls.push(upload.data.publicUrl);
      }

      // 4. Attach the photos and take it live.
      setProgressLabel('Publishing…');
      const published = await publishProperty(propertyId, photoUrls, supabase);
      if (!published.success) {
        Alert.alert('Could not publish', published.error);
        return;
      }

      router.replace('/(landlord)/(tabs)/listings' as any);
    } finally {
      setPublishing(false);
    }
  }, [user?.id, publishing, supabase, p, pt, media, router]);

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
        <Text style={styles.stepLabel}>Step 4 of 4</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ─── Headline ──────────────────────────────────────────────── */}
        <Text style={styles.headline}>Review & publish</Text>
        <Text style={styles.subtext}>Make sure everything looks right.</Text>

        {/* ─── Summary Card ───────────────────────────────────────────── */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryImage}>
            {media[0] ? (
              <Image source={{ uri: media[0].uri }} style={styles.summaryThumb} />
            ) : (
              <Camera size={32} color={color.ink3} strokeWidth={1.5} />
            )}
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>
              {p.title ?? '2BHK Apartment in Baluwatar'}
            </Text>
            <Text style={styles.summaryLocation}>
              {p.location ?? 'Baluwatar, Kathmandu'}
            </Text>
            <Text style={styles.summaryPrice}>
              NPR {p.rent ?? '28,000'}/month
            </Text>
          </View>
        </View>

        {/* ─── Details List ────────────────────────────────────────────── */}
        <View style={styles.detailsCard}>
          {details.map((d, i) => (
            <View
              key={d.label}
              style={[
                styles.detailRow,
                i < details.length - 1 && styles.detailRowBorder,
              ]}>
              <Text style={styles.detailLabel}>{d.label}</Text>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>{d.value}</Text>
                <Check size={14} color={color.brand} strokeWidth={3} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ─── Sticky Bottom ────────────────────────────────────────────── */}
      <View style={styles.bottomArea}>
        <Pressable
          onPress={handlePublish}
          disabled={publishing}
          style={[styles.cta, publishing && styles.ctaDisabled]}
          accessibilityLabel="Publish Listing"
          accessibilityRole="button"
          accessibilityState={{ disabled: publishing, busy: publishing }}>
          {publishing ? (
            <View style={styles.ctaBusy}>
              <ActivityIndicator size="small" color={color.bg} />
              <Text style={styles.ctaText}>{progressLabel}</Text>
            </View>
          ) : (
            <Text style={styles.ctaText}>Publish Listing</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

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
  progressSection: { paddingHorizontal: space.screenH, paddingTop: 12, paddingBottom: 4 },
  stepLabel: { fontFamily: font.sans, fontSize: size.caption, color: color.ink3, marginBottom: 8 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: color.line, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2, backgroundColor: color.ink },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: space.screenH, paddingTop: 28, paddingBottom: 24 },
  headline: { fontFamily: font.display, fontSize: 28, color: color.ink, marginBottom: 6 },
  subtext: { fontFamily: font.sans, fontSize: size.bodySm, color: color.ink2, marginBottom: 24 },
  summaryCard: {
    borderRadius: radius.card, borderWidth: 1, borderColor: color.line,
    backgroundColor: color.bg, overflow: 'hidden',
  },
  summaryImage: { height: 160, backgroundColor: color.input, alignItems: 'center', justifyContent: 'center' },
  summaryThumb: { width: '100%', height: '100%' },
  summaryContent: { padding: space.cardPad, gap: 4 },
  summaryTitle: { fontFamily: font.semibold, fontSize: size.h3, color: color.ink },
  summaryLocation: { fontFamily: font.sans, fontSize: size.bodySm, color: color.ink2 },
  summaryPrice: { fontFamily: font.bold, fontSize: size.body, color: color.brand, marginTop: 4 },
  detailsCard: {
    borderRadius: radius.card, borderWidth: 1, borderColor: color.line,
    backgroundColor: color.bg, marginTop: 16, paddingVertical: 4,
  },
  detailRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: space.cardPad,
  },
  detailRowBorder: { borderBottomWidth: 1, borderBottomColor: color.divider },
  detailLabel: { fontFamily: font.sans, fontSize: size.bodySm, color: color.ink2 },
  detailRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailValue: { fontFamily: font.semibold, fontSize: size.bodySm, color: color.ink },
  bottomArea: { paddingHorizontal: space.screenH, paddingBottom: space.safeBottom + 8, paddingTop: 8 },
  cta: {
    height: space.buttonH, borderRadius: radius.pill, backgroundColor: color.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  ctaDisabled: { opacity: 0.6 },
  ctaBusy: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ctaText: { fontFamily: font.semibold, fontSize: size.body, color: color.bg },
});
