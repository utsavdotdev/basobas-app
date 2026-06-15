import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function LandlordProfileTab() {
  const router = useRouter();

  const menuItems = [
    { label: 'Edit Profile', route: '/(landlord)/edit-profile' },
    { label: 'Visit History', route: '/(landlord)/visits' },
    { label: 'Verification Status', route: '/(landlord)/verification' },
    { label: 'AI Preferences', route: '/(landlord)/ai-preferences' },
    { label: 'Notifications', route: '/(landlord)/notifications' },
  ];

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Profile" rightIcon="settings" />
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
      >
        {/* Avatar */}
        <View className="items-center mb-5">
          <View className="h-[80px] w-[80px] rounded-pill bg-canvas items-center justify-center mb-3">
            <Text className="font-sans text-h1 text-ink3">L</Text>
          </View>
          <Text className="font-semibold text-h3 text-ink">Landlord Name</Text>
          <Text className="font-sans text-body-sm text-ink2">+977 98XXXXXXXX</Text>
        </View>

        {/* Menu sections */}
        <View className="rounded-card border border-line bg-bg">
          {menuItems.map((item, i, arr) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.route as any)}
              className={`px-4 py-4 ${i < arr.length - 1 ? 'border-b border-row-divider' : ''}`}
            >
              <Text className="font-medium text-body text-ink">{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
