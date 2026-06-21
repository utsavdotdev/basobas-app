import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function ProfileSetupScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Profile Setup" showBack centerTitle />
      <ScrollView className="px-6" contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}>
        <Text className="mb-6 font-semibold text-h3 text-ink">Tell us about yourself</Text>
        <View className="mb-4">
          <Text className="mb-1 font-medium text-body-sm text-ink2">Full Name</Text>
          <TextInput
            placeholder="Enter your name"
            className="h-[56px] rounded-lg bg-input px-4 font-sans text-body text-ink"
            placeholderTextColor="#C0C0C0"
          />
        </View>
        <View className="mb-4">
          <Text className="mb-1 font-medium text-body-sm text-ink2">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            className="h-[56px] rounded-lg bg-input px-4 font-sans text-body text-ink"
            placeholderTextColor="#C0C0C0"
          />
        </View>
      </ScrollView>
      <View className="px-6 pb-6">
        <Pressable className="h-[56px] items-center justify-center rounded-pill bg-ink">
          <Text className="font-semibold text-body text-white">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
