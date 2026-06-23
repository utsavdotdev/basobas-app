import { Text, ScrollView } from 'react-native';

import { ScreenBody } from '@/src/components/organisms/ScreenBody';
import { ScreenHeader } from '@/src/components/molecules/ScreenHeader';

export default function VisitsTab() {
  return (
    <ScreenBody>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Visits" />
        <Text className="mt-20 text-center font-sans text-body text-ink2">
          No visits yet. Schedule a visit to see a property.
        </Text>
      </ScrollView>
    </ScreenBody>
  );
}
