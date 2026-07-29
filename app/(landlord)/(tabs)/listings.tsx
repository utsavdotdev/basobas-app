import { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  MoreVertical,
  Eye,
  Inbox,
} from 'lucide-react-native';

// ─── Types ──────────────────────────────────────────────────────────────────

type PropertyStatus = 'active' | 'draft' | 'paused' | 'archived';

interface LandlordProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  status: PropertyStatus;
  views: number;
  requests: number;
  rating: number;
}

interface MyPropertiesScreenProps {
  onBack?: () => void;
  onPropertyPress?: (property: LandlordProperty) => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const TABS = ['All', 'Active', 'Draft', 'Archived'] as const;
type FilterTab = (typeof TABS)[number];

const STATUS_STYLES: Record<
  PropertyStatus,
  { container: string; text: string; label: string }
> = {
  active: {
    container: 'bg-emerald-100/90',
    text: 'text-emerald-800',
    label: 'Active',
  },
  draft: {
    container: 'bg-amber-100/90',
    text: 'text-amber-800',
    label: 'Draft',
  },
  paused: {
    container: 'bg-gray-100/90',
    text: 'text-gray-500',
    label: 'Paused',
  },
  archived: {
    container: 'bg-gray-100/90',
    text: 'text-gray-500',
    label: 'Archived',
  },
};

const PROPERTIES_DATA: LandlordProperty[] = [
  {
    id: '1',
    title: '2BHK Apartment in Baluwatar',
    location: 'Baluwatar, Kathmandu',
    price: 28000,
    status: 'active',
    views: 124,
    requests: 8,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Studio near Thamel',
    location: 'Thamel, Kathmandu',
    price: 18000,
    status: 'active',
    views: 89,
    requests: 5,
    rating: 4.5,
  },
  {
    id: '3',
    title: '3BHK Family Home in Budhanilkantha',
    location: 'Budhanilkantha, Kathmandu',
    price: 55000,
    status: 'active',
    views: 203,
    requests: 12,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Charming 1BHK in Patan',
    location: 'Patan, Lalitpur',
    price: 22000,
    status: 'draft',
    views: 0,
    requests: 0,
    rating: 4.7,
  },
  {
    id: '5',
    title: 'Cozy Studio near Boudha',
    location: 'Boudha, Kathmandu',
    price: 15000,
    status: 'draft',
    views: 0,
    requests: 0,
    rating: 4.4,
  },
  {
    id: '6',
    title: 'Premium 2BHK in Jhamsikhel',
    location: 'Jhamsikhel, Lalitpur',
    price: 45000,
    status: 'archived',
    views: 56,
    requests: 2,
    rating: 4.9,
  },
  {
    id: '7',
    title: 'Affordable 1BHK in Baneshwor',
    location: 'Baneshwor, Kathmandu',
    price: 19500,
    status: 'archived',
    views: 310,
    requests: 18,
    rating: 4.3,
  },
];

const FORMATTER = new Intl.NumberFormat('en-IN');

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return `NPR ${FORMATTER.format(price)}/mo`;
}

function matchesFilter(property: LandlordProperty, tab: FilterTab): boolean {
  if (tab === 'All') return true;
  return property.status === tab.toLowerCase();
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: PropertyStatus }) {
  const cfg = STATUS_STYLES[status];
  return (
    <View className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 ${cfg.container}`}>
      <Text className={`text-xs font-semibold ${cfg.text}`}>{cfg.label}</Text>
    </View>
  );
}

function PropertyCard({
  item,
  onPress,
}: {
  item: LandlordProperty;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm active:opacity-80"
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${formatPrice(item.price)}`}
    >
      <View className="relative h-44 w-full bg-canvas">
        <StatusBadge status={item.status} />
        <TouchableOpacity
          className="absolute top-3 right-3 z-10 h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm"
          activeOpacity={0.7}
          accessibilityLabel="Property actions"
        >
          <MoreVertical size={16} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <View className="gap-1 p-4">
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          {item.title}
        </Text>

        <View className="flex-row items-center gap-1">
          <MapPin size={12} color="#707070" />
          <Text className="flex-1 text-xs font-medium text-gray-500" numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <Text className="my-1 text-sm font-bold text-emerald-800">
          {formatPrice(item.price)}
        </Text>

        <View className="border-t border-gray-100 pt-3 mt-2 flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Eye size={13} color="#9CA3AF" />
            <Text className="text-xs font-semibold text-gray-900">
              {FORMATTER.format(item.views)}
            </Text>
            <Text className="text-xs text-gray-400">views</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Inbox size={13} color="#9CA3AF" />
            <Text className="text-xs font-semibold text-gray-900">
              {FORMATTER.format(item.requests)}
            </Text>
            <Text className="text-xs text-gray-400">requests</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────

export default function MyPropertiesScreen({
  onBack,
  onPropertyPress,
}: MyPropertiesScreenProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filtered = useMemo(
    () => PROPERTIES_DATA.filter((p) => matchesFilter(p, activeTab)),
    [activeTab],
  );

  const count = (tab: FilterTab) => {
    if (tab === 'All') return PROPERTIES_DATA.length;
    return PROPERTIES_DATA.filter(
      (p) => p.status === tab.toLowerCase(),
    ).length;
  };

  return (
    <View className="flex-1 bg-white pt-14">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3">          <TouchableOpacity
            onPress={() => (onBack ? onBack() : router.back())}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            activeOpacity={0.6}
            accessibilityLabel="Go back"
>
            <ArrowLeft size={20} color="#1a1a1a" strokeWidth={2.2} />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-900">My Properties</Text>

          <View className="h-10 w-10" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row border-b border-gray-100 px-4 py-3"
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`mr-2 flex-row items-center gap-1.5 rounded-full px-4 py-2 ${
                  isActive ? 'bg-black' : 'bg-gray-100'
                }`}
                activeOpacity={0.7}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  className={`text-xs ${
                    isActive ? 'font-semibold text-white' : 'font-medium text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
                <View
                  className={`min-w-[18px] items-center justify-center rounded-full px-1.5 py-0.5 ${
                    isActive ? 'bg-white/20' : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-semibold ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {count(tab)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="gap-3 px-4 pt-4 pb-8">
          {filtered.length === 0 ? (
            <View className="items-center px-8 pt-16">
              <Text className="mb-1.5 text-base font-semibold text-gray-900">
                No {activeTab.toLowerCase()} properties
              </Text>
              <Text className="text-center text-sm font-medium leading-5 text-gray-500">
                {activeTab === 'Active'
                  ? 'Create a new listing to get started'
                  : activeTab === 'Draft'
                    ? 'Save a listing as draft to see it here'
                    : 'No archived properties yet'}
              </Text>
            </View>
          ) : (
            filtered.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
                onPress={() =>
                  onPropertyPress
                    ? onPropertyPress(item)
                    : router.push({
                        pathname: '/(landlord)/listing/[id]',
                        params: { id: item.id },
                      } as any)
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
