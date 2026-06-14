import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function PhoneScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Phone Number" showBack centerTitle />
      <View className="flex-1 px-6 pt-6">
        <Text className="font-semibold text-h3 text-ink mb-2">Enter your phone number</Text>
        <Text className="font-sans text-body-sm text-ink2 mb-6">
          {"We'll send you a verification code."}
        </Text>
        <View className="h-[56px] flex-row items-center rounded-lg bg-input px-4">
          <Text className="font-medium text-body text-ink mr-3">+977</Text>
          <TextInput
            placeholder="Phone number"
            keyboardType="phone-pad"
            className="flex-1 font-sans text-body text-ink"
            placeholderTextColor="#C0C0C0"
          />
        </View>
      </View>
      <View className="px-6 pb-6">
        <Pressable
          onPress={() => router.push('/(auth)/otp')}
          className="h-[56px] items-center justify-center rounded-pill bg-ink"
        >
          <Text className="font-semibold text-body text-white">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
