import { useState } from 'react';
import { ScrollView, View, Text, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, MapPin, Phone, Copy, User, Info, Send } from 'lucide-react-native';

export default function ShareDetailsScreen() {
  const router = useRouter();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [contactEnabled, setContactEnabled] = useState(true);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* ── Header Bar ──────────────────────────────────── */}
      <View className="mb-4 flex-row items-center justify-between border-b border-gray-100 bg-white py-3">
        <Pressable onPress={() => router.back()} className="ml-4 h-8 w-8 items-center justify-center">
          <ChevronLeft size={22} color="#000000" />
        </Pressable>
        <Text className="self-center text-base font-bold text-gray-900">Share Details</Text>
        <View className="mr-4 w-6" />
      </View>

      <ScrollView className="flex-1 px-4 pt-2" contentContainerStyle={{ paddingBottom: 120 }}>

        {/* ── Section Heading ────────────────────────────── */}
        <Text className="mb-1.5 text-2xl font-extrabold tracking-tight text-gray-900">Share with Sandeep</Text>
        <Text className="mb-6 text-sm font-medium leading-snug text-gray-500">
          Pick what to send so he can find the place and reach you.
        </Text>

        {/* ── Card 1: Pin Location Switcher ──────────────── */}
        <View className="mb-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
          {/* Header Row */}
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E6F4EA]">
              <MapPin size={18} color="#137333" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-gray-900">Pin location</Text>
              <Text className="mt-0.5 text-xs font-medium text-gray-500">
                Exact GPS pin to the building entrance.
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#E5E7EB', true: '#137333' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Conditional Map Placeholder */}
          {locationEnabled && (
            <>
              {/* Map area */}
              <View className="relative my-3 h-32 w-full overflow-hidden rounded-2xl border border-gray-100 bg-[#E3E8E3]">
                {/* Grid overlay lines */}
                <View className="absolute inset-0">
                  {/* Horizontal grid lines */}
                  <View className="absolute left-0 right-0 top-1/4 h-[0.5px] bg-white/40" />
                  <View className="absolute left-0 right-0 top-2/4 h-[0.5px] bg-white/40" />
                  <View className="absolute left-0 right-0 top-3/4 h-[0.5px] bg-white/40" />
                  {/* Vertical grid lines */}
                  <View className="absolute bottom-0 left-1/4 top-0 w-[0.5px] bg-white/40" />
                  <View className="absolute bottom-0 left-3/4 top-0 w-[0.5px] bg-white/40" />
                </View>

                {/* Centered pin */}
                <View className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -ml-4 -mt-4 items-center justify-center rounded-full bg-black shadow-md">
                  <MapPin size={14} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>

              {/* Location address details */}
              <Text className="mt-2 text-sm font-bold text-gray-900">Baluwatar Heights, Block B</Text>
              <Text className="mt-0.5 text-xs font-medium text-gray-500">
                Ward 4, Kathmandu · Behind Saraswati School
              </Text>
            </>
          )}
        </View>

        {/* ── Card 2: Contact Number Switcher ────────────── */}
        <View className="mb-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
          {/* Header Row */}
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E6F4EA]">
              <Phone size={18} color="#137333" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-gray-900">Contact number</Text>
              <Text className="mt-0.5 text-xs font-medium text-gray-500">
                Tenant can call you to coordinate.
              </Text>
            </View>
            <Switch
              value={contactEnabled}
              onValueChange={setContactEnabled}
              trackColor={{ false: '#E5E7EB', true: '#137333' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Conditional Phone Display */}
          {contactEnabled && (
            <>
              <View className="my-3 flex-row items-center justify-between rounded-2xl border border-gray-100 bg-[#F9FAFB] p-3.5">
                <View>
                  <Text className="text-xs font-semibold text-gray-400">Primary number</Text>
                  <Text className="mt-1 text-base font-bold tracking-wide text-gray-900">
                    +977 98XX-XX1234
                  </Text>
                </View>
                <Pressable className="h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-xs">
                  <Copy size={14} color="#374151" />
                </Pressable>
              </View>

              {/* Use different number */}
              <Pressable className="mt-2">
                <Text className="text-xs font-bold text-gray-900 underline">
                  Use a different number
                </Text>
              </Pressable>
            </>
          )}
        </View>

        {/* ── Summary Footer & Privacy Note ──────────────── */}
        {/* Recipient Pill Box */}
        <View className="mb-3 flex-row items-center gap-3 rounded-2xl border border-gray-100/60 bg-[#F9FAFB] p-3.5">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-gray-200/70">
            <User size={16} color="#6B7280" />
          </View>
          <Text className="text-sm font-semibold text-gray-700">
            Sharing with <Text className="font-bold text-gray-900">Sandeep Khatri</Text>
          </Text>
        </View>

        {/* Privacy Warning Note */}
        <View className="flex-row items-start">
          <Info size={14} color="#9CA3AF" />
          <Text className="ml-1.5 flex-1 text-xs font-medium leading-relaxed text-gray-400">
            Details stay private to this tenant for the visit window. You can revoke anytime.
          </Text>
        </View>

      </ScrollView>

      {/* ── Sticky Send Button ──────────────────────────── */}
      <View className="absolute inset-x-4 bottom-8">
        <Pressable
          onPress={() => router.push('/(landlord)/share-confirmation' as any)}
          className="h-14 flex-row items-center justify-center gap-2 rounded-pill bg-black">
          <Send size={18} color="#FFFFFF" />
          <Text className="text-base font-bold text-white">Send to Sandeep</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
