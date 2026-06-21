import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-2 font-display text-h1 text-ink">BasoBas</Text>
        <Text className="mb-8 text-center font-sans text-body text-ink2">
          Find your perfect home in Nepal.
        </Text>
        <Pressable
          onPress={() => router.push('/(auth)/phone')}
          className="h-[56px] w-full items-center justify-center rounded-pill bg-ink">
          <Text className="font-semibold text-body text-white">Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
