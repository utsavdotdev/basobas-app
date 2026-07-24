import { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, Upload } from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';

const { color, space, radius, font, size } = tokens;

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function NewListingStep3() {
  const router = useRouter();
  const params = useLocalSearchParams<{ propertyType: string; title: string; rent: string; deposit: string; location: string; availableFrom: string; bedrooms: string; bathrooms: string; area: string; floor: string; totalFloors: string; furnishing: string; amenities: string; }>();

  const [photos, setPhotos] = useState<string[]>([]);

  const handleGoBack = useCallback(() => router.back(), [router]);

  const handleContinue = useCallback(() => {
    router.push({
      pathname: '/(landlord)/listing/new/step-4',
      params: { ...params, photos: JSON.stringify(photos) },
    } as any);
  }, [router, params, photos]);

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
        <Text style={styles.stepLabel}>Step 3 of 4</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ─── Headline ──────────────────────────────────────────────── */}
        <Text style={styles.headline}>Add photos</Text>
        <Text style={styles.subtext}>
          {'Listings with 5+ photos get 3\u00D7 more requests.'}
        </Text>

        {/* ─── Photo Grid ────────────────────────────────────────────── */}
        <View style={styles.grid}>
          {/* Slot 1 — Cover */}
          <Pressable style={styles.photoSlot} accessibilityLabel="Add cover photo">
            <View style={styles.coverBadge}>
              <Text style={styles.coverBadgeText}>Cover</Text>
            </View>
            <Camera size={24} color={color.ink3} strokeWidth={1.5} />
          </Pressable>

          {/* Slot 2 */}
          <Pressable style={styles.photoSlot} accessibilityLabel="Add photo 2">
            <Camera size={24} color={color.ink3} strokeWidth={1.5} />
          </Pressable>

          {/* Slot 3 */}
          <Pressable style={styles.photoSlot} accessibilityLabel="Add photo 3">
            <Camera size={24} color={color.ink3} strokeWidth={1.5} />
          </Pressable>

          {/* Slot 4 */}
          <Pressable style={styles.photoSlot} accessibilityLabel="Add photo 4">
            <Camera size={24} color={color.ink3} strokeWidth={1.5} />
          </Pressable>

          {/* Slot 5 — Add */}
          <Pressable style={styles.addSlot} accessibilityLabel="Add more photos">
            <Camera size={24} color={color.ink3} strokeWidth={1.5} />
            <Text style={styles.addSlotText}>Add</Text>
          </Pressable>
        </View>

        {/* ─── Upload from gallery ─────────────────────────────────────── */}
        <Pressable style={styles.galleryButton} accessibilityLabel="Upload from gallery">
          <Upload size={18} color={color.ink} strokeWidth={1.8} />
          <Text style={styles.galleryButtonText}>Upload from gallery</Text>
        </Pressable>
      </ScrollView>

      {/* ─── Sticky Bottom ────────────────────────────────────────────── */}
      <View style={styles.bottomArea}>
        <Pressable
          onPress={handleContinue}
          style={styles.cta}
          accessibilityLabel="Continue"
          accessibilityRole="button">
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.bg,
  },

  // Header
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

  // Progress
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

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.screenH,
    paddingTop: 28,
    paddingBottom: 24,
  },

  // Headline
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

  // Photo grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoSlot: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: radius.card,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coverBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: color.ink,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  coverBadgeText: {
    fontFamily: font.semibold,
    fontSize: size.micro,
    color: color.bg,
  },
  addSlot: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: radius.card,
    borderWidth: 2,
    borderColor: color.line,
    borderStyle: 'dashed',
    backgroundColor: color.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addSlotText: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
  },

  // Gallery button
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    marginTop: 20,
  },
  galleryButtonText: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: color.ink,
  },

  // Bottom CTA
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
