import { Stack } from 'expo-router';

export default function TenantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="_modal/filter" options={{ presentation: 'modal' }} />
      <Stack.Screen name="_modal/notifications-prefs" options={{ presentation: 'modal' }} />
      <Stack.Screen name="property/[id]/gallery" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
    </Stack>
  );
}
