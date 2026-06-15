import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';

export default function SearchTab() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Search" />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}>
        {/* Search bar */}
        <View className="mb-6 h-[48px] flex-row items-center rounded-lg bg-input px-4">
          <TextInput
            autoFocus
            placeholder="Search by location, name..."
            className="flex-1 font-sans text-body text-ink"
            placeholderTextColor="#C0C0C0"
          />
        </View>

        {/* Recent searches */}
        <Text className="font-semibold text-h3 text-ink mb-3">Recent Searches</Text>
        {['Thamel apartments', 'Jhamsikhel 2BHK', 'Near Durbar Marg'].map((item) => (
          <Pressable key={item} className="mb-2 flex-row items-center py-2">
            <Text className="font-sans text-body text-ink2">{item}</Text>
          </Pressable>
        ))}

        {/* Popular */}
        <Text className="font-semibold text-h3 text-ink mt-5 mb-3">Popular</Text>
        <View className="flex-row flex-wrap">
          {['Pet Friendly', 'Furnished', 'With Parking', 'Near School'].map((chip) => (
            <Pressable key={chip} className="mr-2 mb-2 rounded-pill bg-canvas px-4 py-2">
              <Text className="font-medium text-body-sm text-ink">{chip}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Sticky bottom */}
      <View className="border-t border-line px-6 py-4 bg-bg">
        <Pressable
          onPress={() => router.push('/(tenant)/search-results' as any)}
          className="h-[56px] items-center justify-center rounded-pill bg-ink"
        >
          <Text className="font-semibold text-body text-white">Show 240 results</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
