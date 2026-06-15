import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';
import { Calendar, Clock, MapPin, User, ChevronRight } from 'lucide-react-native';

export default function RequestDetailScreen() {
  const { id: _id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Request Detail" showBack={true} centerTitle={true} />
      
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}>
        {/* Tenant Profile Preview Card */}
        <Text className="font-semibold text-bodySm text-ink mb-2">Requesting Tenant</Text>
        <Pressable
          onPress={() => router.push({ pathname: '/(landlord)/tenant/[id]', params: { id: '1' } } as any)}
          className="flex-row items-center justify-between rounded-card border border-line bg-bg p-4 mb-5"
        >
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 rounded-pill bg-canvas items-center justify-center">
              <User size={20} color="#AAAAAA" />
            </View>
            <View>
              <Text className="font-semibold text-body text-ink">Aayush Shrestha</Text>
              <Text className="text-caption text-ink2">Completed 4 past visits</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#0A0A0A" />
        </Pressable>

        {/* Requested Date & Time */}
        <Text className="font-semibold text-bodySm text-ink mb-2">Requested Time Slot</Text>
        <View className="rounded-card border border-line bg-bg p-4 mb-5">
          <View className="flex-row items-center gap-2 mb-2">
            <Calendar size={16} color="#1A6B4A" />
            <Text className="font-medium text-body text-ink">Monday, June 15, 2026</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Clock size={16} color="#1A6B4A" />
            <Text className="font-medium text-body text-ink">2:30 PM - 3:30 PM</Text>
          </View>
        </View>

        {/* Property Summary */}
        <Text className="font-semibold text-bodySm text-ink mb-2">Property</Text>
        <View className="rounded-card border border-line bg-bg p-4 mb-5">
          <Text className="font-semibold text-body text-ink">Baluwatar Luxury Apartment</Text>
          <View className="flex-row items-center gap-1 mt-1">
            <MapPin size={12} color="#6B6B6B" />
            <Text className="text-caption text-ink2">Gairidhara Marg, Baluwatar</Text>
          </View>
        </View>

        {/* Note */}
        <Text className="font-semibold text-bodySm text-ink mb-2">{"Tenant's Note"}</Text>
        <View className="rounded-card border border-line bg-canvas p-4 mb-5">
          <Text className="text-bodySm text-ink2 leading-relaxed">
            {'"I\'m looking to move in by next month and would love to check out the natural lighting and safety features of the building."'}
          </Text>
        </View>

        {/* Suggest Time */}
        <Pressable className="items-center py-2">
          <Text className="font-semibold text-bodySm text-brand">Suggest a different time</Text>
        </Pressable>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-6 inset-x-6 flex-row gap-3">
        <Pressable
          onPress={() => router.back()}
          className="flex-1 h-[56px] items-center justify-center rounded-pill border border-line bg-bg"
        >
          <Text className="font-semibold text-body text-ink2">Decline</Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          className="flex-[2] h-[56px] items-center justify-center rounded-pill bg-brand"
        >
          <Text className="font-semibold text-body text-white">Approve Request</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
