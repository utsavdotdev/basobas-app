import '../global.css';
import { useEffect } from 'react';
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
import { getDevMode } from '../src/config/devMode';

SplashScreen.preventAutoHideAsync();

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

      useAuth.getState().login(devMode);

      const target = devMode === 'tenant' ? '/(tenant)/(tabs)' : '/(landlord)/(tabs)';
      const currentGroup = segments[0];
      if (currentGroup !== `(${devMode})`) {
        router.replace(target as any);
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
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tenant)" />
          <Stack.Screen name="(landlord)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
