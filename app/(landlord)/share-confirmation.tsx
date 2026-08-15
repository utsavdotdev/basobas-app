import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, CheckCircle2, MapPin, Phone, X } from 'lucide-react-native';

import { Avatar, ScreenShell, StatusPill } from '@/src/components/visit/LandlordUI';
import { useVisitsStore } from '@/src/store/visitsStore';
import { c, font, radius, shadow } from '@/src/theme/visitTokens';
import { dayLabel, type TimeSlot } from '@/src/types/property.types';

const ADDRESS = 'Baluwatar Heights, Block B';
const PHONE = '+977 98XX-XX1234';

const SLOT_START: Record<TimeSlot, string> = {
  MORNING: '9:00 AM',
  AFTERNOON: '12:00 PM',
  EVENING: '4:00 PM',
};

export default function DetailsSharedScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const row = useVisitsStore((s) => s.landlordVisits.find((v) => v.id === id));

  const name = row?.tenantName ?? 'the tenant';
  const firstName = name.split(' ')[0] ?? name;
  const visitLine = row
    ? `${dayLabel(row.requestedDate)} · ${SLOT_START[row.timeSlot]}`
    : 'Tomorrow · 4:00 PM';

  return (
    <ScreenShell title="Visit Accepted" showBack paddingBottom={48}>
      {/* Success hero — one block so the stack keeps its internal rhythm */}
      <View style={styles.hero}>
        <View style={styles.haloWrap}>
          <View style={styles.halo}>
            <View style={styles.haloInner}>
              <CheckCircle2 size={28} color="#FFFFFF" strokeWidth={2.2} />
            </View>
          </View>
        </View>
        <Text style={styles.headline}>Details sent to {firstName}</Text>
        <Text style={styles.subcopy}>
          He&apos;ll get a notification with your pin location and contact number.
        </Text>
      </View>

      {/* Summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Avatar name={name} size={44} />
          <View style={styles.summaryNameWrap}>
            <Text numberOfLines={1} style={styles.summaryName}>
              {name}
            </Text>
            <Text style={styles.summaryVerified}>Verified Tenant</Text>
          </View>
          <StatusPill status="Accepted" />
        </View>

        <View style={styles.row}>
          <Calendar size={15} color={c.meta} strokeWidth={2} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowLabel}>Date &amp; Time</Text>
            <Text style={styles.rowValue}>{visitLine}</Text>
          </View>
        </View>

        <View style={[styles.row, styles.rowBorder]}>
          <MapPin size={15} color={c.meta} strokeWidth={2} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowLabel}>Location</Text>
            <Text numberOfLines={1} style={styles.rowValue}>
              {ADDRESS}
            </Text>
          </View>
          <View style={styles.onBadge}>
            <Text style={styles.onText}>ON</Text>
          </View>
        </View>

        <View style={[styles.row, styles.rowBorder]}>
          <Phone size={15} color={c.meta} strokeWidth={2} />
          <View style={styles.rowCopy}>
            <Text style={styles.rowLabel}>Contact</Text>
            <Text style={styles.rowValue}>{PHONE}</Text>
          </View>
          <View style={styles.onBadge}>
            <Text style={styles.onText}>ON</Text>
          </View>
        </View>
      </View>

      {/* Revoke */}
      <TouchableOpacity
        onPress={() => router.replace('/(landlord)/(tabs)/requests' as any)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Revoke shared details"
        style={styles.revokeBtn}>
        <X size={14} color="#C0392B" strokeWidth={2.4} />
        <Text style={styles.revokeText}>Revoke shared details</Text>
      </TouchableOpacity>

      {/* Done */}
      <TouchableOpacity
        onPress={() => router.replace('/(landlord)/(tabs)/requests' as any)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Done"
        style={styles.doneBtn}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  haloWrap: {
    alignItems: 'center',
    marginTop: 40,
  },
  halo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    marginTop: 20,
    fontFamily: font.serif,
    fontSize: 24,
    color: c.ink,
    textAlign: 'center',
  },
  subcopy: {
    marginTop: 8,
    fontFamily: font.sans,
    fontSize: 12,
    lineHeight: 18,
    color: c.meta,
    textAlign: 'center',
    maxWidth: 280,
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
  },
  summaryCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...shadow.card,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: c.hairlineSoft,
  },
  summaryNameWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 10,
  },
  summaryName: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  summaryVerified: {
    marginTop: 2,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: c.hairlineSoft,
  },
  rowCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },
  rowLabel: {
    fontFamily: font.sans,
    fontSize: 10,
    color: c.faint,
  },
  rowValue: {
    marginTop: 2,
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  onBadge: {
    borderRadius: radius.pill,
    backgroundColor: c.greenBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  onText: {
    fontFamily: font.sansSemi,
    fontSize: 9,
    color: c.accent,
  },
  revokeBtn: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: '#FDECEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revokeText: {
    fontFamily: font.sansSemi,
    fontSize: 12,
    color: '#C0392B',
    marginLeft: 6,
  },
  doneBtn: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: c.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
