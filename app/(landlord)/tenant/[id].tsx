import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';
import { ShieldCheck, Star } from 'lucide-react-native';

export default function TenantProfileScreen() {
  const { id: _id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Tenant Profile" showBack={true} centerTitle={true} />
      
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        {/* Identity block */}
        <View className="items-center mb-6">
          <View className="h-[96px] w-[96px] rounded-pill bg-canvas items-center justify-center mb-3 relative">
            <Text className="font-sans text-h1 text-ink3">T</Text>
            <View className="absolute bottom-0 right-0 bg-brand p-1.5 rounded-full border-2 border-bg">
              <ShieldCheck size={16} color="#FFFFFF" />
            </View>
          </View>
          <Text className="font-semibold text-h2 text-ink">Aayush Shrestha</Text>
          <Text className="text-bodySm text-ink2 mt-0.5">Verified Tenant</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Completed Visits', value: '12' },
            { label: 'Rating received', value: '4.9★' },
            { label: 'Member Since', value: '2024' },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 items-center rounded-card border border-line bg-bg p-3">
              <Text className="font-semibold text-body text-ink">{stat.value}</Text>
              <Text className="text-[10px] text-ink2 text-center mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Trust Indicators */}
        <Text className="font-semibold text-h3 text-ink mb-3">Trust Indicators</Text>
        <View className="rounded-card border border-line bg-bg p-4 mb-6">
          {[
            'KYC verification successfully completed',
            'Phone number verified (+977 980-XXXXXXX)',
            'No reports or policy violations',
          ].map((indicator, i) => (
            <View key={i} className="flex-row items-center gap-2 mb-2">
              <ShieldCheck size={14} color="#1A6B4A" />
              <Text className="text-bodySm text-ink2">{indicator}</Text>
            </View>
          ))}
        </View>

        {/* Reviews from other landlords */}
        <Text className="font-semibold text-h3 text-ink mb-3">Reviews from Landlords</Text>
        <View className="rounded-card border border-line bg-bg p-4">
          <View className="mb-4 pb-3 border-b border-row-divider">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-semibold text-bodySm text-ink">Ram Prasad</Text>
              <View className="flex-row items-center gap-1">
                <Star size={12} color="#F5A623" fill="#F5A623" />
                <Text className="text-caption font-semibold text-ink">5.0</Text>
              </View>
            </View>
            <Text className="text-bodySm text-ink2 italic">{'"Punctual, polite, and kept the premises exceptionally clean."'}</Text>
          </View>
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-semibold text-bodySm text-ink">Sita Devi</Text>
              <View className="flex-row items-center gap-1">
                <Star size={12} color="#F5A623" fill="#F5A623" />
                <Text className="text-caption font-semibold text-ink">4.8</Text>
              </View>
            </View>
            <Text className="text-bodySm text-ink2 italic">{'"Highly recommended tenant. Communication was smooth throughout."'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
