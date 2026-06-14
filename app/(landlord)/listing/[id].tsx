import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';
import { Eye, Calendar, Star, MessageSquare } from 'lucide-react-native';

export default function ListingDetailScreen() {
  const { id: _id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader
        title="Listing Detail"
        showBack={true}
        centerTitle={true}
        rightText={{ label: 'Edit', onPress: () => {} }}
      />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        {/* Photo Carousel Area */}
        <View className="h-48 rounded-card bg-canvas items-center justify-center mb-5">
          <Text className="text-bodySm text-ink3">Property Photos Carousel</Text>
        </View>

        {/* Title and Status */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1 mr-4">
            <Text className="font-semibold text-h2 text-ink">Baluwatar Luxury Apartment</Text>
            <Text className="text-body text-ink2 mt-1">NPR 45,000 / month</Text>
          </View>
          <View className="rounded-pill bg-brandLight px-3 py-1">
            <Text className="font-semibold text-caption text-brand">Active</Text>
          </View>
        </View>

        {/* Performance Stats */}
        <Text className="font-semibold text-h3 text-ink mb-3">Inquiry Performance</Text>
        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Views', value: '412', icon: Eye },
            { label: 'Visits', value: '18', icon: Calendar },
            { label: 'Chats', value: '29', icon: MessageSquare },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} className="flex-1 items-center rounded-card border border-line bg-bg p-4">
                <Icon size={18} color="#1A6B4A" />
                <Text className="font-bold text-h3 text-ink mt-2">{stat.value}</Text>
                <Text className="text-caption text-ink2 mt-0.5">{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Active Visit Requests */}
        <Text className="font-semibold text-h3 text-ink mb-3">Pending Requests</Text>
        <View className="rounded-card border border-line bg-bg p-4 mb-6">
          <Pressable
            onPress={() => router.push({ pathname: '/(landlord)/request/[id]', params: { id: '1' } } as any)}
            className="flex-row justify-between items-center"
          >
            <View>
              <Text className="font-medium text-body text-ink">Aayush Shrestha</Text>
              <Text className="text-caption text-ink2 mt-0.5">Tomorrow · 2:30 PM</Text>
            </View>
            <Text className="font-semibold text-bodySm text-brand">View Details ➔</Text>
          </Pressable>
        </View>

        {/* Reviews */}
        <Text className="font-semibold text-h3 text-ink mb-3">Reviews</Text>
        <View className="rounded-card border border-line bg-bg p-4">
          <View className="flex-row items-center gap-1 mb-2">
            <Star size={16} color="#F5A623" fill="#F5A623" />
            <Text className="font-semibold text-body text-ink">4.8</Text>
            <Text className="text-caption text-ink2">(6 reviews)</Text>
          </View>
          <Text className="text-bodySm text-ink2 italic">{'"Highly responsive landlord and a very neat apartment." - Priya'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
