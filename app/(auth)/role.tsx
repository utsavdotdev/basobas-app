import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/store/authStore';
import { ScreenHeader } from '../../src/components/molecules/ScreenHeader';

export default function RoleScreen() {
  const { login } = useAuth();

  const selectRole = (role: 'tenant' | 'landlord') => {
    login(role);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Choose Your Role" showBack centerTitle />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-display text-h2 text-ink mb-2 text-center">
          How will you use BasoBas?
        </Text>
        <Text className="font-sans text-body text-ink2 text-center mb-8">
          You can always switch later.
        </Text>

        <Pressable
          onPress={() => selectRole('tenant')}
          className="mb-4 h-[80px] w-full flex-row items-center rounded-card border border-line bg-bg px-5"
        >
          <View className="flex-1">
            <Text className="font-semibold text-h3 text-ink">{"I'm a Tenant"}</Text>
            <Text className="font-sans text-body-sm text-ink2">Looking for a place to rent</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => selectRole('landlord')}
          className="h-[80px] w-full flex-row items-center rounded-card border border-line bg-bg px-5"
        >
          <View className="flex-1">
            <Text className="font-semibold text-h3 text-ink">{"I'm a Landlord"}</Text>
            <Text className="font-sans text-body-sm text-ink2">I have property to list</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
