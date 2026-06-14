import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function OTPScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Verification" showBack centerTitle />
      <View className="flex-1 px-6 pt-6">
        <Text className="font-semibold text-h3 text-ink mb-2">Enter verification code</Text>
        <Text className="font-sans text-body-sm text-ink2 mb-6">
          We sent a 6-digit code to your phone.
        </Text>
        <View className="flex-row justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <TextInput
              key={i}
              maxLength={1}
              keyboardType="number-pad"
              className="h-[56px] w-[48px] rounded-lg bg-input text-center font-semibold text-h3 text-ink"
            />
          ))}
        </View>
        <Pressable className="mt-4">
          <Text className="font-medium text-body-sm text-brand">Resend code</Text>
        </Pressable>
      </View>
      <View className="px-6 pb-6">
        <Pressable
          onPress={() => router.push('/(auth)/role')}
          className="h-[56px] items-center justify-center rounded-pill bg-ink"
        >
          <Text className="font-semibold text-body text-white">Verify</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
