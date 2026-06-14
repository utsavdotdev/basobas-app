import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeatureVerifiedScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-display text-h2 text-ink mb-2">Verified Properties</Text>
        <Text className="font-sans text-body text-ink2 text-center">
          Every listing is personally verified by our team.
        </Text>
      </View>
    </SafeAreaView>
  );
}
