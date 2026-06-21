import '../global.css';
import { useEffect, useRef } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { useAuth } from '../src/store/authStore';

SplashScreen.preventAutoHideAsync();

/**
 * Returns the dev mode from the .env file, or null if not set.
 * Each developer sets EXPO_PUBLIC_DEV_MODE in their own .env:
 *   'auth'     — stay on (auth) screens (no redirect)
 *   'tenant'   — auto-login as tenant, navigate to (tenant)/(tabs)
 *   'landlord' — auto-login as landlord, navigate to (landlord)/(tabs)
 */
type DevMode = 'auth' | 'tenant' | 'landlord' | null;
function getDevMode(): DevMode {
  const raw = process.env.EXPO_PUBLIC_DEV_MODE;
  if (raw === 'tenant' || raw === 'landlord' || raw === 'auth') return raw;
  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    DMSerifDisplay_400Regular,
  });

  const { isAuthenticated, role } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Track whether we've already handled the dev-mode redirect for this mount.
  // Prevents repeated redirects on re-renders while segments catch up.
  const devHandled = useRef(false);

  useEffect(() => {
    if (!fontsLoaded) return;
    SplashScreen.hideAsync();

    const devMode = getDevMode();

    // ── Development mode ───────────────────────────────────────────────────
    if (devMode) {
      if (devMode === 'auth') {
        // No auth redirect — stay wherever the URL says.
        return;
      }

      // For tenant / landlord: set the auth store state and redirect if needed.
      if (!devHandled.current) {
        devHandled.current = true;
        useAuth.getState().login(devMode);
        const target = devMode === 'tenant' ? '/(tenant)/(tabs)' : '/(landlord)/(tabs)';
        const currentGroup = segments[0];
        if (currentGroup !== `(${devMode})`) {
          router.replace(target as any);
        }
      }
      return;
    }

    // ── Production auth flow ───────────────────────────────────────────────
    const inAuth = segments[0] === '(auth)';
    if (!isAuthenticated && !inAuth) {
      router.replace('/(auth)/loading');
    } else if (isAuthenticated) {
      const target = role === 'landlord' ? '/(landlord)/(tabs)' : '/(tenant)/(tabs)';
      const inRole = segments[0] === `(${role})`;
      if (!inRole) router.replace(target as any);
    }
  }, [fontsLoaded, isAuthenticated, role, segments, router]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tenant)" />
          <Stack.Screen name="(landlord)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
