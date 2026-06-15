import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function KYCLandlordScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Landlord Verification" showBack centerTitle />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        <Text className="font-semibold text-h3 text-ink mb-2">Verify your identity</Text>
        <Text className="font-sans text-body-sm text-ink2 mb-6">
          Upload your documents to get verified and build trust.
        </Text>
        <View className="h-[120px] items-center justify-center rounded-card border-2 border-dashed border-line bg-canvas mb-4">
          <Text className="font-medium text-body-sm text-ink2">Upload ID Document</Text>
        </View>
        <View className="h-[120px] items-center justify-center rounded-card border-2 border-dashed border-line bg-canvas">
          <Text className="font-medium text-body-sm text-ink2">Upload Property Ownership</Text>
        </View>
      </ScrollView>
      <View className="px-6 pb-6">
        <Pressable className="h-[56px] items-center justify-center rounded-pill bg-ink">
          <Text className="font-semibold text-body text-white">Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
