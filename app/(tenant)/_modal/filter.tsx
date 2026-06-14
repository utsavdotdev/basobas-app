import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function FilterModal() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg">
      <View className="h-1.5 w-12 self-center rounded-full bg-line mt-3 mb-1" />
      <ScreenHeader
        title="Filters"
        showBack={true}
        centerTitle={true}
        rightText={{ label: 'Reset', onPress: () => {} }}
      />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Location Section */}
        <View className="mb-6">
          <Text className="font-semibold text-[18px] text-ink mb-3">Location</Text>
          <View className="rounded-card border border-line bg-input px-4 py-3">
            <Text className="text-body text-ink2">Kathmandu, Nepal</Text>
          </View>
        </View>

        {/* Property Type Section */}
        <View className="mb-6">
          <Text className="font-semibold text-[18px] text-ink mb-3">Property Type</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Apartment', 'House', 'Room', 'Studio'].map((type) => (
              <Pressable key={type} className="rounded-pill border border-line bg-bg px-4 py-2">
                <Text className="font-medium text-bodySm text-ink2">{type}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Budget Dual Slider */}
        <View className="mb-6">
          <Text className="font-semibold text-[18px] text-ink mb-3">Budget Range</Text>
          <View className="h-2 w-full rounded bg-line justify-center mb-2">
            <View className="h-2 w-1/2 bg-brand rounded self-center" />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-caption text-ink2">NPR 10,000</Text>
            <Text className="text-caption text-ink2">NPR 150,000+</Text>
          </View>
        </View>

        {/* Bedrooms */}
        <View className="mb-6">
          <Text className="font-semibold text-[18px] text-ink mb-3">Bedrooms</Text>
          <View className="flex-row gap-2">
            {['Any', '1', '2', '3', '4+'].map((num) => (
              <Pressable key={num} className="flex-1 items-center rounded-pill border border-line bg-bg py-2">
                <Text className="font-medium text-bodySm text-ink2">{num}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View className="mb-6">
          <Text className="font-semibold text-[18px] text-ink mb-3">Amenities</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Wifi', 'AC', 'Parking', 'Gym', 'Security', 'Balcony'].map((amenity) => (
              <Pressable key={amenity} className="rounded-pill border border-line bg-bg px-4 py-2">
                <Text className="font-medium text-bodySm text-ink2">{amenity}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View className="absolute bottom-6 inset-x-6">
        <Pressable onPress={() => router.back()} className="h-[56px] items-center justify-center rounded-pill bg-brand">
          <Text className="font-semibold text-body text-white">Show 240 results</Text>
        </Pressable>
      </View>
    </View>
  );
}
