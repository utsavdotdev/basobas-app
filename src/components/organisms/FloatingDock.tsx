import { View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  Home, Search, ClipboardList, UserCircle, Inbox, LayoutGrid, type LucideIcon,
} from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const ICONS: Record<string, LucideIcon> = {
  index: Home,
  search: Search,
  visits: ClipboardList,
  profile: UserCircle,
  requests: Inbox,
  listings: LayoutGrid,
};

type Props = BottomTabBarProps & { variant: 'tenant' | 'landlord' };

export const FloatingDock = ({ state, navigation, variant: _variant }: Props) => (
  <View pointerEvents="box-none" className="absolute inset-x-0 bottom-7 items-center">
    <BlurView
      intensity={40}
      tint="dark"
      className="h-[64px] w-[312px] flex-row overflow-hidden rounded-pill"
      style={{
        backgroundColor: 'rgba(18,18,18,0.72)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 32,
        elevation: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.10)',
      }}
    >
      {state.routes.map((route, i) => {
        const Icon = ICONS[route.name] ?? Home;
        const active = state.index === i;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!active && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable key={route.key} onPress={onPress} className="flex-1 items-center justify-center">
            <Icon size={22} color={active ? '#FFFFFF' : 'rgba(255,255,255,0.35)'} strokeWidth={active ? 2.4 : 1.8} />
            {active && <View className="mt-1 h-[3px] w-[20px] rounded-pill bg-white" />}
          </Pressable>
        );
      })}
    </BlurView>
  </View>
);
