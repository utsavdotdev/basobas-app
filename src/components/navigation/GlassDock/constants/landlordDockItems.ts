import { Home, Inbox, Bell, User } from 'lucide-react-native';
import type { DockItem } from '../types/dock';

/**
 * Landlord bottom dock: Home → Inbox → Notifications → Profile.
 *
 * Keys match the expo-router route names defined in
 * `app/(landlord)/(tabs)/_layout.tsx`:
 *   index    → Home tab
 *   listings → Inbox tab  (Inbox icon)
 *   requests → Requests/Notifications tab  (Bell icon)
 *   profile  → Profile tab
 *
 * The visual order (Home, Inbox, Notifications, Profile) differs from
 * the Tabs.Screen declaration order but that is intentional — the dock order
 * is driven by UX, not the router's internal route index.
 */
export const LANDLORD_DOCK_ITEMS: readonly DockItem[] = [
  { key: 'index', icon: Home },
  { key: 'listings', icon: Inbox, badge: 8 },
  { key: 'requests', icon: Bell },
  { key: 'profile', icon: User },
];
