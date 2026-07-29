import { useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Share as ShareIcon,
  User,
  CheckCircle,
  Star,
  ChevronRight,
} from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';

const { color, space, radius, font, size } = tokens;

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  available: boolean;
}

const MOCK_LISTINGS: Listing[] = [
  { id: '1', title: '2BHK Apartment', location: 'Pulchowk', price: 'NPR 18k/mo', available: true },
  { id: '2', title: 'Studio Room', location: 'Baluwatar', price: 'NPR 12k/mo', available: true },
  { id: '3', title: '1BHK Flat', location: 'Jhamsikhel', price: 'NPR 15k/mo', available: false },
  { id: '4', title: 'Penthouse', location: 'Lalitpur', price: 'NPR 45k/mo', available: true },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function PublicLandlordProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: 'Check out Bikash Sharma on BasoBas!',
      });
    } catch {
      // user cancelled
    }
  }, []);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          onPress={handleGoBack}
          style={styles.circleButton}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <ArrowLeft size={18} color={color.ink} strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>Landlord Profile</Text>
        <Pressable
          onPress={handleShare}
          style={styles.circleButton}
          accessibilityLabel="Share"
          accessibilityRole="button">
          <ShareIcon size={18} color={color.ink} strokeWidth={1.8} />
        </Pressable>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ─── Bio Card ──────────────────────────────────────────────── */}
        <View style={styles.bioCard}>
          {/* Avatar + Info */}
          <View style={styles.bioTopSection}>
            <View style={styles.avatar}>
              <User size={32} color={color.ink3} strokeWidth={1.5} />
            </View>
            <View style={styles.bioInfo}>
              <Text style={styles.bioName}>Bikash Sharma</Text>
              <View style={styles.verifiedBadge}>
                <CheckCircle size={13} color="#1A6B4A" strokeWidth={2} />
                <Text style={styles.verifiedText}>Identity Verified</Text>
              </View>
              <Text style={styles.memberSinceText}>Member since 2023</Text>
            </View>
          </View>

          <View style={styles.bioDivider} />

          {/* 4-Column Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <View style={styles.statStarRow}>
                <Star size={14} color="#F5A623" fill="#F5A623" strokeWidth={1.5} />
                <Text style={styles.statNumber}>4.8</Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <Text style={styles.statNumber}>62</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statColumn}>
              <Text style={styles.statNumber}>2yr</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>
        </View>

        {/* ─── Trust Highlights ──────────────────────────────────────── */}
        <View style={styles.trustCard}>
          <Text style={styles.trustTitle}>Why tenants trust Bikash</Text>

          <View style={styles.trustRow}>
            <CheckCircle size={16} color="#1A6B4A" strokeWidth={2.5} />
            <Text style={styles.trustText}>Identity verified with citizenship</Text>
          </View>
          <View style={styles.trustRow}>
            <CheckCircle size={16} color="#1A6B4A" strokeWidth={2.5} />
            <Text style={styles.trustText}>Average response time under 2 hours</Text>
          </View>
          <View style={styles.trustRow}>
            <CheckCircle size={16} color="#1A6B4A" strokeWidth={2.5} />
            <Text style={styles.trustText}>98% visit acceptance rate</Text>
          </View>
        </View>

        {/* ─── Segment Control ───────────────────────────────────────── */}
        <View style={styles.segmentContainer}>
          <Pressable
            onPress={() => setActiveTab('listings')}
            style={[styles.segmentTab, activeTab === 'listings' && styles.segmentTabActive]}
            accessibilityLabel="Active Listings"
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'listings' }}>
            <Text style={[styles.segmentText, activeTab === 'listings' && styles.segmentTextActive]}>
              Active Listings
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('reviews')}
            style={[styles.segmentTab, activeTab === 'reviews' && styles.segmentTabActive]}
            accessibilityLabel="Reviews"
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'reviews' }}>
            <Text style={[styles.segmentText, activeTab === 'reviews' && styles.segmentTextActive]}>
              Reviews
            </Text>
          </Pressable>
        </View>

        {/* ─── Active Listings Grid ──────────────────────────────────── */}
        {activeTab === 'listings' && (
          <View style={styles.listingsGrid}>
            {MOCK_LISTINGS.map((listing) => (
              <Pressable
                key={listing.id}
                style={styles.listingCard}
                onPress={() => router.push({ pathname: '/(tenant)/schedule-visit/[propertyId]', params: { propertyId: listing.id } } as any)}
                accessibilityLabel={`${listing.title} in ${listing.location}`}
                accessibilityRole="button">
                {/* Image placeholder */}
                <View style={styles.listingImage}>
                  {listing.available && (
                    <View style={styles.availableBadge}>
                      <View style={styles.availableDot} />
                      <Text style={styles.availableText}>Available</Text>
                    </View>
                  )}
                </View>
                {/* Content */}
                <View style={styles.listingContent}>
                  <Text style={styles.listingTitle}>{listing.title}</Text>
                  <Text style={styles.listingLocation}>{listing.location}</Text>
                  <Text style={styles.listingPrice}>{listing.price}</Text>
                  <View style={styles.requestVisitRow}>
                    <Text style={styles.requestVisitText}>Request Visit</Text>
                    <ChevronRight size={14} color="#1A6B4A" strokeWidth={2.5} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {/* ─── Reviews Tab Placeholder ───────────────────────────────── */}
        {activeTab === 'reviews' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Reviews coming soon</Text>
          </View>
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: space.screenH,
    backgroundColor: color.bg,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: font.semibold,
    fontSize: 17,
    color: color.ink,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.screenH,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // Bio card
  bioCard: {
    borderRadius: radius.hero,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: color.bg,
    padding: space.cardPad,
  },
  bioTopSection: {
    flexDirection: 'row',
    gap: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bioName: {
    fontFamily: font.semibold,
    fontSize: size.h3,
    color: color.ink,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5EE',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  verifiedText: {
    fontFamily: font.medium,
    fontSize: size.caption,
    color: '#1A6B4A',
  },
  memberSinceText: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
    marginTop: 4,
  },

  // Divider
  bioDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: space.cardPad,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: font.bold,
    fontSize: size.h3,
    color: color.ink,
  },
  statLabel: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
    marginTop: 2,
  },
  statStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
  },

  // Trust highlights
  trustCard: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: color.bg,
    padding: space.cardPad,
    marginTop: 14,
  },
  trustTitle: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.ink,
    marginBottom: 12,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  trustText: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: color.ink2,
    flex: 1,
  },

  // Segment control
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: color.input,
    borderRadius: radius.pill,
    padding: 3,
    marginTop: 16,
  },
  segmentTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radius.pill - 2,
  },
  segmentTabActive: {
    backgroundColor: color.bg,
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
  },
  segmentText: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: color.ink3,
  },
  segmentTextActive: {
    color: color.ink,
  },

  // Listings grid
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  listingCard: {
    width: '47%',
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: color.bg,
    overflow: 'hidden',
  },
  listingImage: {
    height: 100,
    backgroundColor: '#EBEBEB',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5EE',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A6B4A',
  },
  availableText: {
    fontFamily: font.semibold,
    fontSize: size.micro,
    color: '#1A6B4A',
  },
  listingContent: {
    padding: 10,
    backgroundColor: color.bg,
    gap: 2,
  },
  listingTitle: {
    fontFamily: font.semibold,
    fontSize: size.bodySm,
    color: color.ink,
  },
  listingLocation: {
    fontFamily: font.sans,
    fontSize: size.caption,
    color: color.ink3,
  },
  listingPrice: {
    fontFamily: font.bold,
    fontSize: size.bodySm,
    color: color.ink,
    marginTop: 4,
  },
  requestVisitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 6,
  },
  requestVisitText: {
    fontFamily: font.semibold,
    fontSize: size.caption,
    color: '#1A6B4A',
  },

  // Empty state (reviews)
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    marginTop: 16,
  },
  emptyStateText: {
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink3,
  },
});
