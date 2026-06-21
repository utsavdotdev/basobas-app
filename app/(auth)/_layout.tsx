import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Splash — fades in on its own via reanimated, no Stack transition */}
      <Stack.Screen name="loading" options={{ animation: 'none' }} />

      {/* Onboarding — single screen with internal step state */}
      <Stack.Screen name="onboarding" options={{ animation: 'fade', animationDuration: 350 }} />
      <Stack.Screen name="feature-verified" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="feature-visits" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="feature-map" options={{ animation: 'slide_from_right' }} />

      {/* Auth flow — fade for the root landing, slide for sub-screens */}
      <Stack.Screen name="landing" options={{ animation: 'fade', animationDuration: 300 }} />
      <Stack.Screen name="phone" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="otp" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="role" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="profile-setup" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="kyc-tenant" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="kyc-landlord" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
