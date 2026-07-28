import { useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import {
  MapPin,
  Star,
  Bed,
  Bath,
  Wifi,
  Car,
  Eye,
  Heart,
  Pause,
  Users,
} from 'lucide-react-native';

import { PropertyHero } from '@/src/components/property/PropertyHero';
import { Avatar } from '@/src/components/user/Avatar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.42;

const FORMATTER = new Intl.NumberFormat('en-IN');

// ─── Types ───────────────────────────────────────────────────────────────────

interface Amenity {
  icon: string;
  label: string;
}

interface Owner {
  name: string;
  avatarUrl?: string;
  verified: boolean;
  listingsCount: number;
}

interface ListingDetail {
  id: string;
  title: string;
  location: string;
  rating: number;
  priceMonthly: number;
  currency: string;
  images: string[];
  amenities: Amenity[];
  about: string;
  owner: Owner;
  status: 'active' | 'paused';
  views: number;
  savedCount: number;
  requestCount: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_LISTING: ListingDetail = {
  id: '1',
  title: '2BHK Apartment in Baluwatar',
  location: 'Baluwatar, Kathmandu',
  rating: 4.8,
  priceMonthly: 28000,
  currency: 'Rs.',
  images: Array.from({ length: 12 }, (_, i) => `photo-${i + 1}`),
  amenities: [
    { icon: 'bed', label: '2 Bed' },
    { icon: 'bath', label: '1 Bath' },
    { icon: 'wifi', label: 'Wi-Fi' },
    { icon: 'car', label: 'Parking' },
  ],
  about:
    'Sunlit 2BHK with balcony, walking distance to UN Park. Newly renovated with modern fittings. Quiet neighborhood with excellent water supply and active security.',
  owner: {
    name: 'Sita Sharma',
    verified: true,
    listingsCount: 12,
  },
  status: 'active',
  views: 412,
  savedCount: 38,
  requestCount: 8,
};

interface ListingDetailScreenProps {
  onBack?: () => void;
  onPauseListing?: () => void;
  onViewApplicants?: () => void;
}

// ─── Amenity Icon Map ────────────────────────────────────────────────────────

const AMENITY_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  bed: Bed,
  bath: Bath,
  wifi: Wifi,
  car: Car,
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ListingDetailScreen({
  onBack,
  onPauseListing,
  onViewApplicants,
}: ListingDetailScreenProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const listing = MOCK_LISTING;
  const ownerInitials = listing.owner.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleBack = useCallback(() => {
    if (onBack) onBack();
    else router.back();
  }, [onBack, router]);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `${listing.title} — ${listing.currency} ${FORMATTER.format(listing.priceMonthly)}/mo`,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        });
      } catch {
        // user cancelled
      }
    } else {
      console.log('Share:', listing.title);
    }
  }, [listing]);

  return (
    <View className="flex-1 bg-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══ Hero Image Area ═══ */}
        <PropertyHero
          height={HERO_HEIGHT}
          images={listing.images}
          onBack={handleBack}
          onShare={handleShare}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />

        {/* ═══ Content ═══ */}
        <View className="px-6 pt-4">
          {/* Title — serif */}
          <Text className="font-display text-h1 leading-tight text-ink">
            {listing.title}
          </Text>

          {/* Location + Rating row */}
          <View className="mt-2 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MapPin size={14} color="#6B6B6B" />
              <Text className="ml-1 font-sans text-body-sm text-ink2">
                {listing.location}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Star size={14} color="#F5A623" fill="#F5A623" />
              <Text className="ml-1 font-medium text-body-sm text-ink">
                {listing.rating}
              </Text>
            </View>
          </View>

          {/* Price row */}
          <Text className="mt-3 font-bold text-h2 text-brand">
            {listing.currency} {FORMATTER.format(listing.priceMonthly)}
            <Text className="font-sans text-body text-ink2">
              {' '}/ month
            </Text>
          </Text>

          {/* Status pill */}
          <View className="mt-3 flex-row items-center gap-2">
            <View
              className={`rounded-pill px-3 py-1 ${
                listing.status === 'active' ? 'bg-emerald-100/90' : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  listing.status === 'active' ? 'text-emerald-800' : 'text-gray-500'
                }`}
              >
                {listing.status === 'active' ? 'Active' : 'Paused'}
              </Text>
            </View>
          </View>

          {/* ═══ Amenities Card ═══ */}
          <View className="mt-5 flex-row items-center rounded-card bg-canvas px-4 py-4">
            {listing.amenities.map((amenity, i) => {
              const IconComponent = AMENITY_ICONS[amenity.icon];
              return (
                <View key={amenity.label} className="flex-1 flex-row items-center">
                  <View className="flex-1 items-center">
                    {IconComponent && <IconComponent size={20} color="#6B6B6B" />}
                    <Text className="mt-1.5 font-sans text-caption text-ink2">
                      {amenity.label}
                    </Text>
                  </View>
                  {i < listing.amenities.length - 1 && (
                    <View className="h-8 w-[1px] bg-line" />
                  )}
                </View>
              );
            })}
          </View>

          {/* ═══ About Section ═══ */}
          <Text className="mt-6 font-semibold text-h3 text-ink">About</Text>
          <Text className="mt-2 font-sans text-body leading-relaxed text-ink2">
            {listing.about}
          </Text>

          {/* ═══ Owner Card ═══ */}
          <View className="mt-5 flex-row items-center rounded-card bg-canvas p-4">
            <Avatar size={48} initials={ownerInitials} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-body text-ink">
                {listing.owner.name}
              </Text>
              <Text className="mt-0.5 font-sans text-body-sm text-ink2">
                Verified owner · {listing.owner.listingsCount} listings
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ═══ Sticky Bottom Action Bar ═══ */}
      <View className="border-t border-line bg-bg px-6 pb-6 pt-4">
        {/* Stats row */}
        <View className="mb-4 flex-row items-center justify-center gap-6">
          <View className="flex-row items-center gap-1.5">
            <Eye size={16} color="#6B6B6B" />
            <Text className="font-bold text-body text-ink">
              {FORMATTER.format(listing.views)}
            </Text>
            <Text className="font-sans text-body-sm text-ink2">views</Text>
          </View>
          <View className="h-4 w-[1px] bg-line" />
          <View className="flex-row items-center gap-1.5">
            <Heart size={16} color="#6B6B6B" />
            <Text className="font-bold text-body text-ink">
              {FORMATTER.format(listing.savedCount)}
            </Text>
            <Text className="font-sans text-body-sm text-ink2">saved</Text>
          </View>
          <View className="h-4 w-[1px] bg-line" />
          <View className="flex-row items-center gap-1.5">
            <Users size={16} color="#6B6B6B" />
            <Text className="font-bold text-body text-ink">
              {FORMATTER.format(listing.requestCount)}
            </Text>
            <Text className="font-sans text-body-sm text-ink2">requests</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View className="flex-row gap-3">
          <Pressable
            onPress={onPauseListing}
            className="h-[48px] flex-1 flex-row items-center justify-center gap-2 rounded-pill border border-line"
            accessibilityRole="button"
            accessibilityLabel="Pause listing"
          >
            <Pause size={16} color="#0A0A0A" />
            <Text className="font-semibold text-body text-ink">Pause Listing</Text>
          </Pressable>

          <Pressable
            onPress={onViewApplicants}
            className="h-[48px] flex-1 flex-row items-center justify-center gap-2 rounded-pill bg-ink"
            accessibilityRole="button"
            accessibilityLabel="View applicants"
          >
            <Users size={16} color="#FFFFFF" />
            <Text className="font-semibold text-body text-white">View Applicants</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
