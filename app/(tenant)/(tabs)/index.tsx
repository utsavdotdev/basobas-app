import { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Bell, Search } from 'lucide-react-native';

import { ScreenBody } from '@/src/components/organisms/ScreenBody';

// ─── Constants ──────────────────────────────────────────────────────────────

const CITIES = ['Kathmandu', 'Lalitpur', 'Bhaktapur'] as const;
type City = (typeof CITIES)[number];

const RECOMMENDED = [
  {
    id: 'thamel',
    title: 'Studio near Thamel',
    price: 'Rs. 18,000 / month',
    location: 'Kathmandu',
  },
  {
    id: 'patan',
    title: '1BHK in Patan',
    price: 'Rs. 22,000 / month',
    location: 'Lalitpur',
  },
] as const;

// ─── Screen ─────────────────────────────────────────────────────────────────

export default function HomeTab() {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState<City>('Kathmandu');

  return (
    <ScreenBody>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        {/* Status bar / safe-top spacer */}
        <View className="h-12" />

        {/* Greeting + bell */}
        <View className="flex-row items-center justify-between px-[24px] py-4">
          <View>
            <Text className="font-sans text-body-sm text-ink2">Namaste</Text>
            <Text className="mt-1 font-display text-h1 leading-tight text-ink">
              Find a rental in Nepal
            </Text>
          </View>
          <Link href={'/(tenant)/notifications' as any} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              className="h-[48px] w-[48px] items-center justify-center rounded-pill bg-input">
              <Bell size={20} color="#0A0A0A" />
            </Pressable>
          </Link>
        </View>

        {/* Search bar */}
        <View className="px-[24px] pt-2">
          <Pressable
            onPress={() => router.push('/(tenant)/(tabs)/search' as any)}
            accessibilityRole="button"
            accessibilityLabel="Open search"
            className="h-input-h flex-row items-center gap-3 rounded-pill bg-input px-5">
            <Search size={20} color="#888888" />
            <Text className="font-sans text-body text-ink2">Search city, area, or property</Text>
          </Pressable>
        </View>

        {/* City filter chips */}
        <View className="flex-row flex-wrap gap-3 px-[24px] pt-6">
          {CITIES.map((city) => {
            const isActive = city === activeCity;
            return (
              <Pressable
                key={city}
                onPress={() => setActiveCity(city)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Filter by ${city}`}
                className={`h-[42px] items-center justify-center rounded-pill px-5 ${
                  isActive ? 'bg-ink' : 'bg-input'
                }`}>
                <Text className={`font-sans text-body-sm ${isActive ? 'text-bg' : 'text-ink'}`}>
                  {city}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Featured property card — placeholder */}
        <View className="px-[24px] pt-6">
          <View className="w-full overflow-hidden rounded-hero bg-canvas pb-2">
            <View className="h-[210px] w-full bg-placeholder-image" />
            <View className="px-5 py-4">
              <Text numberOfLines={1} className="font-semibold text-h3 text-ink">
                2BHK Apartment in Kupondole
              </Text>
              <Text className="mt-1 font-sans text-body text-brand">Rs. 32,000 / month</Text>
              <Text className="mt-[6px] font-sans text-body-sm text-ink2">Lalitpur · Verified</Text>
            </View>
          </View>
        </View>

        {/* Recommended heading */}
        <View className="px-[24px] pt-8">
          <Text className="font-semibold text-h2 text-ink">Recommended</Text>
        </View>

        {/* Recommended rows */}
        <View className="px-[24px] pt-4">
          {RECOMMENDED.map((row, idx) => (
            <View
              key={row.id}
              className={`flex-row items-center gap-4 py-4 ${
                idx < RECOMMENDED.length - 1 ? 'border-b border-divider' : ''
              }`}>
              <View className="h-[72px] w-[72px] rounded-lg bg-placeholder-image" />
              <View className="flex-1">
                <Text numberOfLines={1} className="font-semibold text-body text-ink">
                  {row.title}
                </Text>
                <Text className="mt-1 font-sans text-body-sm text-ink2">{row.price}</Text>
                <Text className="mt-1 font-sans text-caption text-placeholder">{row.location}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenBody>
  );
}
