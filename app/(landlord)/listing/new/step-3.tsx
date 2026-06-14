import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../../src/components/molecules/ScreenHeader';
import { Image, Upload } from 'lucide-react-native';

export default function NewListingStep3() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="New Listing" showBack={true} centerTitle={true} />
      
      {/* Progress Bar */}
      <View className="h-1 w-full bg-line">
        <View className="h-full w-3/4 bg-brand" />
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        <Text className="font-semibold text-h2 text-ink mb-1">Photos & Details</Text>
        <Text className="text-body text-ink2 mb-6">Upload high quality photos and describe the amenities.</Text>

        {/* Photos Upload Grid */}
        <View className="mb-6">
          <Text className="font-semibold text-bodySm text-ink mb-2">Upload Photos (Max 12)</Text>
          <View className="flex-row gap-3">
            <Pressable className="flex-1 h-24 rounded-card border-2 border-dashed border-line bg-input items-center justify-center">
              <Upload size={20} color="#6B6B6B" />
              <Text className="text-caption text-ink2 mt-1">Upload</Text>
            </Pressable>
            <View className="flex-1 h-24 rounded-card bg-canvas items-center justify-center">
              <Image size={20} color="#AAAAAA" />
            </View>
            <View className="flex-1 h-24 rounded-card bg-canvas items-center justify-center">
              <Image size={20} color="#AAAAAA" />
            </View>
          </View>
        </View>

        {/* Description Textarea */}
        <View className="mb-6">
          <Text className="font-semibold text-bodySm text-ink mb-2">Property Description</Text>
          <TextInput
            placeholder="Write a descriptive overview of the property, surroundings, and rental conditions..."
            placeholderTextColor="#C0C0C0"
            multiline={true}
            numberOfLines={4}
            className="h-[120px] rounded-lg border border-line bg-input p-4 font-sans text-body text-ink"
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        {/* Amenities Selection */}
        <View className="mb-6">
          <Text className="font-semibold text-bodySm text-ink mb-3">Amenities</Text>
          <View className="flex-row flex-wrap gap-2">
            {['Wifi', 'AC', 'Parking', 'Gym', 'Security', 'Power Backup'].map((amenity) => (
              <Pressable key={amenity} className="rounded-pill border border-line bg-bg px-4 py-2">
                <Text className="font-medium text-bodySm text-ink2">{amenity}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* House Rules */}
        <View className="mb-6">
          <Text className="font-semibold text-bodySm text-ink mb-3">House Rules</Text>
          <View className="flex-row flex-wrap gap-2">
            {['No Smoking', 'No Pets', 'Family Only', 'Veg Only'].map((rule) => (
              <Pressable key={rule} className="rounded-pill border border-line bg-bg px-4 py-2">
                <Text className="font-medium text-bodySm text-ink2">{rule}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom */}
      <View className="absolute bottom-6 inset-x-6">
        <Pressable
          onPress={() => router.push('/(landlord)/listing/new/step-4' as any)}
          className="h-[56px] items-center justify-center rounded-pill bg-brand"
        >
          <Text className="font-semibold text-body text-white">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
