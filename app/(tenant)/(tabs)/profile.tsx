import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function ProfileTab() {
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
            <Text className="font-sans text-h1 text-ink3">U</Text>
          </View>
          <Text className="font-semibold text-h3 text-ink">User Name</Text>
          <Text className="font-sans text-body-sm text-ink2">+977 98XXXXXXXX</Text>
        </View>

        {/* Menu sections placeholder */}
        <View className="rounded-card border border-line bg-bg">
          {['Edit Profile', 'Saved Properties', 'My Reviews', 'Rental Preferences', 'KYC Upload'].map((item, i, arr) => (
            <View key={item} className={`px-4 py-4 ${i < arr.length - 1 ? 'border-b border-row-divider' : ''}`}>
              <Text className="font-medium text-body text-ink">{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
