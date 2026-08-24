import { useCallback } from 'react';
import { useUser } from '@clerk/expo';
import { Tabs, useFocusEffect } from 'expo-router';
import { FloatingDock } from '@/src/components/navigation/FloatingDock';
import { useLandlordPendingCount } from '@/src/hooks/useLandlordPendingCount';

export default function LandlordTabsLayout() {
  const { user } = useUser();
  const clerkId = user?.id;

  // Live badge count — realtime-synced with the DB (re-queries on any
  // visit_requests change for this landlord).
  const { count: pendingCount, refresh } = useLandlordPendingCount(clerkId);

  // Fallback: re-check on focus in case an event was missed while backgrounded.
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <Tabs
      tabBar={(props) => <FloatingDock variant="landlord" pendingCount={pendingCount} {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="requests" options={{ title: 'Request' }} />
      <Tabs.Screen name="listings" options={{ title: 'Listing' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
