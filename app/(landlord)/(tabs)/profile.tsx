import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenBody } from '@/src/components/layout/ScreenBody';
import { ScreenHeader } from '@/src/components/layout/ScreenHeader';
import { useAuth } from '@clerk/expo';
import { useAuthStore } from '@/src/store/authStore';
import { useOnboardingStore } from '@/src/store/onboardingStore';

export default function LandlordProfileTab() {
  const router = useRouter();
  const { signOut } = useAuth();

  const menuItems = [
    { label: 'Edit Profile', route: '/(landlord)/edit-profile' },
    { label: 'Visit History', route: '/(landlord)/visits' },
    { label: 'Verification Status', route: '/(landlord)/verification' },
    { label: 'AI Preferences', route: '/(landlord)/ai-preferences' },
    { label: 'Notifications', route: '/(landlord)/notifications' },
    { label: 'Settings', route: '/(landlord)/settings' },
  ];

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
            try { await signOut() } catch {}
            useAuthStore.getState().clearAll();
            useOnboardingStore.getState().reset();
            router.replace('/(auth)/phone');
          },
        },
      ]
    );
  };

  return (
    <ScreenBody>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" rightIcon="settings" />

        {/* Avatar */}
        <View className="mb-5 mt-4 items-center px-6">
          <View className="mb-3 h-[80px] w-[80px] items-center justify-center rounded-pill bg-canvas">
            <Text className="font-sans text-h1 text-ink3">L</Text>
          </View>
          <Text className="font-semibold text-h3 text-ink">Landlord Name</Text>
          <Text className="font-sans text-body-sm text-ink2">+977 98XXXXXXXX</Text>
        </View>

        {/* Menu sections */}
        <View className="mx-6 rounded-card border border-line bg-bg">
          {menuItems.map((item, i, arr) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.route as any)}
              className={`px-4 py-4 ${i < arr.length - 1 ? 'border-b border-row-divider' : ''}`}>
              <Text className="font-medium text-body text-ink">{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <View className="mx-6 mt-8">
          <Text className="mb-2 font-semibold text-caption uppercase tracking-wider text-ink3">Account</Text>
          <Pressable
            onPress={handleLogout}
            className="h-[56px] items-center justify-center rounded-pill border border-danger">
            <Text className="font-semibold text-body text-danger">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenBody>
  );
}
