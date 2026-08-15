import { useMemo, useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenBody } from '@/src/components/layout/ScreenBody';
import { PageHeader } from '@/src/components/visit/PageHeader';
import { UnderlineTabs } from '@/src/components/visit/UnderlineTabs';
import { VisitCard } from '@/src/components/visit/VisitCard';
import { VisitEmptyState } from '@/src/components/visit/EmptyState';
import { useVisitsStore } from '@/src/store/visitsStore';
import { sp } from '@/src/theme/visitTokens';
import type { TenantVisitRequest, TimeSlot } from '@/src/types/property.types';

// ─── Tabs ────────────────────────────────────────────────────────────────────

type TabKey = 'upcoming' | 'past' | 'cancelled';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
];

const OPEN_UI = new Set<TenantVisitRequest['statusUi']>(['pending', 'accepted', 'rescheduled']);

const EMPTY_COPY: Record<TabKey, { title: string; body: string }> = {
  upcoming: { title: 'No upcoming visits', body: 'Visits will appear here once scheduled.' },
  past: { title: 'No past visits', body: 'Visits will appear here once scheduled.' },
  cancelled: { title: 'No cancelled visits', body: 'Visits will appear here once scheduled.' },
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function VisitsTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const visits = useVisitsStore((s) => s.tenantVisits);
  const isLoading = useVisitsStore((s) => s.isLoading);

  const [activeTab, setActiveTab] = useState<TabKey>('upcoming');

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const filtered = useMemo(() => {
    const rows = [...visits];
    switch (activeTab) {
      case 'upcoming':
        return rows
          .filter(
            (v) => OPEN_UI.has(v.statusUi) && new Date(`${v.requestedDate}T00:00:00`) >= today
          )
          .sort((a, b) => a.requestedDate.localeCompare(b.requestedDate));
      case 'past':
        return rows
          .filter(
            (v) =>
              v.statusUi === 'completed' ||
              v.statusUi === 'discussion' ||
              v.statusUi === 'finalized' ||
              (OPEN_UI.has(v.statusUi) && new Date(`${v.requestedDate}T00:00:00`) < today)
          )
          .sort((a, b) => b.requestedDate.localeCompare(a.requestedDate));
      case 'cancelled':
        return rows
          .filter((v) => v.statusUi === 'rejected' || v.statusUi === 'cancelled')
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }, [activeTab, visits, today]);

  const counts = useMemo(() => {
    const result: Record<TabKey, number> = { upcoming: 0, past: 0, cancelled: 0 };
    for (const v of visits) {
      const isOpen = OPEN_UI.has(v.statusUi);
      const past = new Date(`${v.requestedDate}T00:00:00`) < today;
      if (v.statusUi === 'rejected' || v.statusUi === 'cancelled') result.cancelled += 1;
      else if (
        v.statusUi === 'completed' ||
        v.statusUi === 'discussion' ||
        v.statusUi === 'finalized' ||
        (isOpen && past)
      )
        result.past += 1;
      else if (isOpen) result.upcoming += 1;
    }
    return result;
  }, [visits, today]);

  const tabs = TABS.map((t) => ({ ...t, count: counts[t.key] }));
  const empty = EMPTY_COPY[activeTab];

  return (
    <ScreenBody>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: sp.lg }}>
            <VisitCard
              variant="tenant"
              status={item.statusUi}
              date={item.requestedDate}
              timeSlot={item.timeSlot as TimeSlot}
              propertyTitle={item.propertyTitle ?? 'Property'}
              propertyArea={item.propertyArea}
              propertyPrice={item.propertyPrice}
              propertyPhotoUrl={item.propertyPhotoUrl}
              onPress={() =>
                router.push({ pathname: '/(tenant)/visit/[id]', params: { id: item.id } } as any)
              }
            />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <PageHeader
              title="My Visits"
              subtitle={`${counts.upcoming} scheduled visit${counts.upcoming === 1 ? '' : 's'}`}
            />
            <View style={{ height: 8 }} />
            <UnderlineTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
            <View style={{ height: sp.base }} />
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: sp.base }} />}
        ListEmptyComponent={
          isLoading && visits.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 80 }}>
              <ActivityIndicator size="small" color="#1A6B4A" />
            </View>
          ) : (
            <VisitEmptyState title={empty.title} body={empty.body} />
          )
        }
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 120 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenBody>
  );
}
