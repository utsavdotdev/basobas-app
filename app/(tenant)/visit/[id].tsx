import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function VisitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Visit Detail" showBack centerTitle />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        {/* Status banner */}
        <View className="mb-4 rounded-lg bg-brand-light px-4 py-3">
          <Text className="font-semibold text-body text-brand">Confirmed</Text>
        </View>

        {/* Property card */}
        <View className="mb-4 rounded-card border border-line p-4">
          <Text className="font-semibold text-body text-ink">Modern 2BHK in Thamel</Text>
          <Text className="font-sans text-body-sm text-ink2">Visit #{id}</Text>
        </View>

        {/* Date/time */}
        <View className="mb-4 rounded-card bg-canvas p-4">
          <Text className="mb-1 font-semibold text-body text-ink">Wednesday, June 18</Text>
          <Text className="font-sans text-body-sm text-ink2">10:00 AM · In-person</Text>
        </View>

        {/* Landlord */}
        <View className="flex-row items-center rounded-card border border-line p-4">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-pill bg-canvas">
            <Text className="font-sans text-body text-ink3">L</Text>
          </View>
          <View>
            <Text className="font-semibold text-body text-ink">Ram Sharma</Text>
            <Text className="font-sans text-body-sm text-ink2">Landlord</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
