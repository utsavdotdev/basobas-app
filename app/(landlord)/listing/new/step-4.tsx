import { useCallback, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Check, Camera } from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';

const { color, space, radius, font, size } = tokens;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJSON(val: string | undefined): string[] {
  try {
    return JSON.parse(val ?? '[]');
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

export default function NewListingStep4() {
  const router = useRouter();
  const p = useLocalSearchParams<Record<string, string>>();

  const pt = (p.propertyType ?? 'Apartment') as string;

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

  const handlePublish = useCallback(() => {
    // TODO: submit to backend
    router.replace('/(landlord)/(tabs)/listings' as any);
  }, [router]);

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
            <Camera size={32} color={color.ink3} strokeWidth={1.5} />
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
          style={styles.cta}
          accessibilityLabel="Publish Listing"
          accessibilityRole="button">
          <Text style={styles.ctaText}>Publish Listing</Text>
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
  ctaText: { fontFamily: font.semibold, fontSize: size.body, color: color.bg },
});
