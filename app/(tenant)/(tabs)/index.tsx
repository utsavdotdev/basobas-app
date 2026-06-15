import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { Bell } from 'lucide-react-native';

export default function HomeTab() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      {/* Header */}
      <View className="h-[56px] flex-row items-center justify-between px-6">
        <Text className="font-display text-h2 text-ink">BasoBas</Text>
        <Link href={'/(tenant)/notifications' as any} asChild>
          <Pressable className="h-10 w-10 items-center justify-center rounded-pill bg-input">
            <Bell size={18} color="#0A0A0A" />
          </Pressable>
        </Link>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}>
        {/* City pill */}
        <Pressable className="mb-4 self-start rounded-pill bg-canvas px-4 py-2">
          <Text className="font-medium text-body-sm text-ink">Kathmandu ▾</Text>
        </Pressable>

        {/* Search bar */}
        <Pressable
          onPress={() => router.push('/(tenant)/(tabs)/search' as any)}
          className="mb-6 h-[48px] flex-row items-center rounded-lg bg-input px-4"
        >
          <Text className="font-sans text-body text-placeholder">Search properties...</Text>
        </Pressable>

        {/* Greeting */}
        <Text className="font-display text-h2 text-ink mb-1">Good afternoon 👋</Text>
        <Text className="font-sans text-body text-ink2 mb-5">Find your next home.</Text>

        {/* Quick filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {['All', '1 BHK', '2 BHK', '3 BHK', 'Studio', 'Flat'].map((chip) => (
            <Pressable key={chip} className="mr-2 rounded-pill bg-canvas px-4 py-2">
              <Text className="font-medium text-body-sm text-ink">{chip}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* AI Picks section */}
        <Text className="font-semibold text-h3 text-ink mb-3">AI Picks for you</Text>
        <View className="h-[180px] rounded-card bg-canvas mb-5 items-center justify-center">
          <Text className="font-sans text-body-sm text-ink3">Property carousel placeholder</Text>
        </View>

        {/* Newly verified */}
        <Text className="font-semibold text-h3 text-ink mb-3">Newly verified</Text>
        <View className="h-[180px] rounded-card bg-canvas mb-5 items-center justify-center">
          <Text className="font-sans text-body-sm text-ink3">Property carousel placeholder</Text>
        </View>

        {/* Browse by area */}
        <Text className="font-semibold text-h3 text-ink mb-3">Browse by area</Text>
        <View className="flex-row flex-wrap">
          {['Thamel', 'Lazimpat', 'Baluwatar', 'Jhamsikhel'].map((area) => (
            <View key={area} className="mb-3 mr-3 h-[80px] w-[48%] items-center justify-center rounded-card bg-canvas">
              <Text className="font-medium text-body-sm text-ink">{area}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
