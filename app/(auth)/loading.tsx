import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';


export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <Text className="font-display text-h1 text-ink mb-4">BasoBas</Text>
      <ActivityIndicator size="small" color="#1A6B4A" />
      <Redirect href="/(auth)/landing" />
    </View>
  );
}
