import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../../src/components/molecules/ScreenHeader';
import { Calendar, MapPin } from 'lucide-react-native';

export default function RequestsTab() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Requests" />
      
      {/* Filter Tabs */}
      <View className="border-b border-line">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-3">
          {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map((tab, i) => (
            <Pressable key={tab} className={`mr-4 pb-2 ${i === 1 ? 'border-b-2 border-brand' : ''}`}>
              <Text className={`font-medium text-bodySm ${i === 1 ? 'text-brand' : 'text-ink2'}`}>{tab}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}>
        {/* Request Cards */}
        {[
          { id: '1', tenant: 'Aayush Shrestha', property: 'Baluwatar Apartment', date: 'June 15, 2026', time: '2:30 PM', status: 'pending' },
          { id: '2', tenant: 'Priya Adhikari', property: 'Jhamsikhel Flat', date: 'June 15, 2026', time: '4:00 PM', status: 'pending' },
          { id: '3', tenant: 'Rohan Thapa', property: 'Lazimpat Studio', date: 'June 17, 2026', time: '11:00 AM', status: 'approved' },
        ].map((req) => (
          <Pressable
            key={req.id}
            onPress={() => router.push({ pathname: '/(landlord)/request/[id]', params: { id: req.id } } as any)}
            className="mb-4 rounded-card border border-line bg-bg p-4"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-semibold text-body text-ink">{req.tenant}</Text>
              <View className={`rounded-pill px-2.5 py-0.5 ${req.status === 'pending' ? 'bg-amber-100' : 'bg-green-100'}`}>
                <Text className={`font-semibold text-[11px] capitalize ${req.status === 'pending' ? 'text-amber-800' : 'text-green-800'}`}>{req.status}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-1 mb-1">
              <MapPin size={14} color="#6B6B6B" />
              <Text className="text-bodySm text-ink2">{req.property}</Text>
            </View>

            <View className="flex-row items-center gap-1 mb-4">
              <Calendar size={14} color="#6B6B6B" />
              <Text className="text-bodySm text-ink2">{req.date} at {req.time}</Text>
            </View>

            {req.status === 'pending' && (
              <View className="flex-row gap-2 border-t border-row-divider pt-3">
                <Pressable className="flex-1 h-9 items-center justify-center rounded-pill bg-brandLight">
                  <Text className="font-semibold text-bodySm text-brand">Approve</Text>
                </Pressable>
                <Pressable className="flex-1 h-9 items-center justify-center rounded-pill bg-dangerBg">
                  <Text className="font-semibold text-bodySm text-danger">Decline</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
