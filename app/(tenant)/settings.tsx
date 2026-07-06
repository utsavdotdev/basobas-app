import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../src/components/layout/ScreenHeader';
import { useAuth } from '@clerk/expo';
import { useAuthStore } from '@/src/store/authStore';
import { useOnboardingStore } from '@/src/store/onboardingStore';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              // 1. Sign out from Clerk (clears the Clerk session + all cached tokens)
              await signOut();
            } catch (err) {
              console.warn('[Logout] Clerk signOut error (non-fatal):', err);
            }

            // 2. Clear local Zustand stores
            useAuthStore.getState().clearAll();
            useOnboardingStore.getState().reset();

            // 3. Reset navigation stack to auth flow — replaces the entire nav stack
            //    so the user cannot go back to authenticated screens.
            router.replace('/(auth)/phone');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Settings" showBack centerTitle />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        <View className="rounded-card border border-line bg-bg">
          {['Notifications', 'Privacy', 'Language', 'Help & Support', 'Terms of Service', 'About'].map((item, i, arr) => (
            <Pressable key={item} className={`px-4 py-4 ${i < arr.length - 1 ? 'border-b border-row-divider' : ''}`}>
              <Text className="font-medium text-body text-ink">{item}</Text>
            </Pressable>
          ))}
        </View>

        {/* ═══ DANGER ZONE ═══ */}
        <Text className="mt-8 mb-2 font-semibold text-caption uppercase tracking-wider text-ink3">Account</Text>

        <Pressable
          onPress={handleLogout}
          className="h-[56px] items-center justify-center rounded-pill border border-danger">
          <Text className="font-semibold text-body text-danger">Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
