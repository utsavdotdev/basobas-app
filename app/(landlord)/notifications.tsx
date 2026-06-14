import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function NotificationsScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Notifications" showBack centerTitle rightText={{ label: 'Mark all read' }} />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {['All', 'Visits', 'Listings', 'System'].map((tab, i) => (
            <Pressable key={tab} className={`mr-2 rounded-pill px-4 py-2 ${i === 0 ? 'bg-ink' : 'bg-canvas'}`}>
              <Text className={`font-medium text-body-sm ${i === 0 ? 'text-white' : 'text-ink'}`}>{tab}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Today */}
        <Text className="font-semibold text-body-sm text-ink3 mb-3">Today</Text>
        {[
          { title: 'New Visit Request', desc: 'Aayush Shrestha requested a visit for Baluwatar Apartment.', time: '2h ago' },
          { title: 'Listing Approved', desc: 'Your listing "Jhamsikhel Flat" has been verified and published.', time: '5h ago' },
        ].map((item, i) => (
          <View key={i} className="flex-row items-start mb-4 pb-4 border-b border-row-divider">
            <View className="h-10 w-10 rounded-pill bg-brandLight items-center justify-center mr-3">
              <Text className="font-bold text-caption text-brand">L</Text>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-body text-ink">{item.title}</Text>
              <Text className="font-sans text-body-sm text-ink2">{item.desc}</Text>
              <Text className="font-sans text-caption text-ink3 mt-1">{item.time}</Text>
            </View>
            <View className="h-2 w-2 rounded-pill bg-brand mt-2" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
