import { Stack } from 'expo-router';
import { useProfileBootstrap } from '@/src/hooks/useProfileBootstrap';

export default function TenantLayout() {
  // Load profile + Pro status early (on mount) so the Profile tab isn't blank.
  useProfileBootstrap();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="ai-preferences" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="esewa-webview" />
      <Stack.Screen name="kyc-upload" />
      <Stack.Screen name="kyc-status" />
      <Stack.Screen name="landlord/[id]" />
      <Stack.Screen name="list-property" />
      <Stack.Screen name="map" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="pro-plan" />
      <Stack.Screen name="payment-success" />
      <Stack.Screen name="payment-failed" />
      <Stack.Screen name="property/[id]" />
      <Stack.Screen name="report" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="reviews/property/[id]" />
      <Stack.Screen name="reviews/write/[visitId]" />
      <Stack.Screen name="saved" />
      <Stack.Screen name="schedule-visit/[propertyId]" />
      <Stack.Screen name="search-results" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="visit/[id]" />
      <Stack.Screen name="visit/reschedule" />
      <Stack.Screen name="_modal/filter" options={{ presentation: 'modal' }} />
      <Stack.Screen name="_modal/notifications-prefs" options={{ presentation: 'modal' }} />
      <Stack.Screen name="_modal/pro-gate" options={{ presentation: 'modal' }} />
      <Stack.Screen
        name="property/[id]/gallery"
        options={{ presentation: 'fullScreenModal', animation: 'fade' }}
      />
    </Stack>
  );
}
