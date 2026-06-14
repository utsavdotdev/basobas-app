import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function VisitsTab() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Visits" />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}>
        <Text className="font-sans text-body text-ink2 text-center mt-20">
          No visits yet. Schedule a visit to see a property.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
