import { useState, useMemo } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Calendar, ArrowRight } from 'lucide-react-native';

import { ScreenBody } from '@/src/components/layout/ScreenBody';

// ─── Types ──────────────────────────────────────────────────────────────────

type RequestStatus = 'pending' | 'accepted';

type VisitRequest = {
  id: string;
  tenant: string;
  property: string;
  date: string;
  time: string;
  status: RequestStatus;
};

// ─── Mock Data ──────────────────────────────────────────────────────────────

const VISIT_REQUESTS: VisitRequest[] = [
  { id: '1', tenant: 'Aayush Shrestha', property: 'Baluwatar Apartment', date: 'June 15, 2026', time: '2:30 PM', status: 'pending' },
  { id: '2', tenant: 'Priya Adhikari', property: 'Jhamsikhel Flat', date: 'June 15, 2026', time: '4:00 PM', status: 'pending' },
  { id: '3', tenant: 'Anisha KC', property: 'Lazimpat Studio', date: 'June 16, 2026', time: '10:00 AM', status: 'pending' },
  { id: '4', tenant: 'Rohan Thapa', property: 'Lazimpat Studio', date: 'June 17, 2026', time: '11:00 AM', status: 'accepted' },
  { id: '5', tenant: 'Binod Karki', property: 'Baluwatar Apartment', date: 'June 18, 2026', time: '1:00 PM', status: 'accepted' },
  { id: '6', tenant: 'Riya Pandey', property: 'Jhamsikhel Flat', date: 'June 19, 2026', time: '3:00 PM', status: 'pending' },
];

type Tab = { key: string; label: string; count: number };
const TABS: Tab[] = [
  { key: 'all', label: 'All', count: VISIT_REQUESTS.length },
  { key: 'pending', label: 'Pending', count: VISIT_REQUESTS.filter((r) => r.status === 'pending').length },
  { key: 'accepted', label: 'Accepted', count: VISIT_REQUESTS.filter((r) => r.status === 'accepted').length },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function VisitRequestsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredRequests = useMemo(
    () =>
      activeTab === 'all'
        ? VISIT_REQUESTS
        : VISIT_REQUESTS.filter((r) => r.status === activeTab),
    [activeTab],
  );

  return (
    <ScreenBody className="flex-1 bg-[#fafafa]">
      {/* ── Header ────────────────────────────────────────── */}
      <View className="border-b border-gray-200 px-4 pt-3 pb-3">
        <Text className="text-xl font-bold text-gray-900">Visit Requests</Text>
      </View>

      {/* ── Filter Tabs ──────────────────────────────────── */}
      <View className="flex-row items-center gap-2 px-4 py-3">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className={`flex-row items-center gap-1 rounded-full px-4 py-2 ${
                isActive ? 'bg-black' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-xs font-semibold ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}>
                {tab.label} ({tab.count})
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ── Request Cards ────────────────────────────────── */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={() => (
          <View className="items-center py-20">
            <Text className="font-sans text-body-sm text-ink3">No requests found</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(landlord)/request/[id]',
                params: { id: item.id, status: item.status },
              } as any)
            }
            className="rounded-2xl border border-gray-200/50 bg-white p-5 shadow-sm">
            {/* User Info Row */}
            <View className="flex-row items-center">
              {/* Avatar */}
              <View className="h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                <User size={18} color="#6B6B6B" />
              </View>
              {/* Name + Property */}
              <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-gray-900">{item.tenant}</Text>
                <Text className="text-xs font-medium text-gray-400">{item.property}</Text>
              </View>
              {/* Status Pill */}
              <View
                className={`rounded-full px-3 py-1 ${
                  item.status === 'pending' ? 'bg-amber-100/80' : 'bg-emerald-100/80'
                }`}>
                <Text
                  className={`text-xs font-semibold ${
                    item.status === 'pending' ? 'text-amber-800' : 'text-emerald-800'
                  }`}>
                  {item.status === 'pending' ? 'Pending' : 'Accepted'}
                </Text>
              </View>
            </View>

            {/* Date Row */}
            <View className="mt-3 flex-row items-center gap-1.5">
              <Calendar size={14} color="#9CA3AF" />
              <Text className="text-xs font-medium text-gray-500">
                {item.date} at {item.time}
              </Text>
            </View>

            {/* Conditional Action Link (Pending only) */}
            {item.status === 'pending' && (
              <View className="mt-3 flex-row items-center gap-1">
                <Text className="text-xs font-bold text-gray-900">Tap to review</Text>
                <ArrowRight size={14} color="#111827" strokeWidth={2.5} />
              </View>
            )}
          </Pressable>
        )}
      />
    </ScreenBody>
  );
}
