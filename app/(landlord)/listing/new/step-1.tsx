import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../../src/components/molecules/ScreenHeader';

export default function NewListingStep1() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="New Listing" showBack={true} centerTitle={true} />
      
      {/* Progress Bar */}
      <View className="h-1 w-full bg-line">
        <View className="h-full w-1/4 bg-brand" />
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <Text className="font-semibold text-h2 text-ink mb-1">Property Basics</Text>
        <Text className="text-body text-ink2 mb-6">{"Let's start with the basic details of your property."}</Text>

        {/* Title Input */}
        <View className="mb-5">
          <Text className="font-semibold text-bodySm text-ink mb-2">Listing Title</Text>
          <TextInput
            placeholder="e.g. Spacious 2 BHK Apartment in Baluwatar"
            placeholderTextColor="#C0C0C0"
            className="h-[56px] rounded-lg border border-line bg-input px-4 font-sans text-body text-ink"
          />
        </View>

        {/* Property Type */}
        <View className="mb-5">
          <Text className="font-semibold text-bodySm text-ink mb-2">Property Type</Text>
          <View className="flex-row gap-2">
            {['Apartment', 'House', 'Flat', 'Room'].map((type, i) => (
              <Pressable key={type} className={`flex-1 h-11 items-center justify-center rounded-pill border ${i === 0 ? 'bg-brandLight border-brand' : 'bg-bg border-line'}`}>
                <Text className={`font-semibold text-bodySm ${i === 0 ? 'text-brand' : 'text-ink2'}`}>{type}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Counters */}
        <View className="flex-row gap-4 mb-5">
          <View className="flex-1">
            <Text className="font-semibold text-bodySm text-ink mb-2">Bedrooms</Text>
            <View className="flex-row h-12 rounded-lg border border-line bg-input items-center justify-between px-3">
              <Pressable className="h-8 w-8 rounded-full bg-bg border border-line items-center justify-center">
                <Text className="font-bold text-body text-ink">-</Text>
              </Pressable>
              <Text className="font-semibold text-body text-ink">2</Text>
              <Pressable className="h-8 w-8 rounded-full bg-bg border border-line items-center justify-center">
                <Text className="font-bold text-body text-ink">+</Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-1">
            <Text className="font-semibold text-bodySm text-ink mb-2">Bathrooms</Text>
            <View className="flex-row h-12 rounded-lg border border-line bg-input items-center justify-between px-3">
              <Pressable className="h-8 w-8 rounded-full bg-bg border border-line items-center justify-center">
                <Text className="font-bold text-body text-ink">-</Text>
              </Pressable>
              <Text className="font-semibold text-body text-ink">1</Text>
              <Pressable className="h-8 w-8 rounded-full bg-bg border border-line items-center justify-center">
                <Text className="font-bold text-body text-ink">+</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Size (sqft) */}
        <View className="mb-5">
          <Text className="font-semibold text-bodySm text-ink mb-2">Area Size (sq. ft.)</Text>
          <TextInput
            placeholder="e.g. 1200"
            placeholderTextColor="#C0C0C0"
            keyboardType="numeric"
            className="h-[56px] rounded-lg border border-line bg-input px-4 font-sans text-body text-ink"
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom */}
      <View className="absolute bottom-6 inset-x-6">
        <Pressable
          onPress={() => router.push('/(landlord)/listing/new/step-2' as any)}
          className="h-[56px] items-center justify-center rounded-pill bg-brand"
        >
          <Text className="font-semibold text-body text-white">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
