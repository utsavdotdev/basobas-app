import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight, CheckCircle2, Copy, MapPin, Phone, ShieldCheck } from 'lucide-react-native';

import { Avatar, ScreenShell, Toggle } from '@/src/components/visit/LandlordUI';
import { useVisitsStore } from '@/src/store/visitsStore';
import { c, font, radius, shadow } from '@/src/theme/visitTokens';
import { dayLabel, type TimeSlot } from '@/src/types/property.types';

const ADDRESS = 'Baluwatar Heights, Block B';
const ADDRESS_SUB = 'Ward 4, Kathmandu · Behind Saraswati School';
const PHONE = '+977 98XX-XX1234';

const SLOT_START: Record<TimeSlot, string> = {
  MORNING: '9:00 AM',
  AFTERNOON: '12:00 PM',
  EVENING: '4:00 PM',
};

export default function ShareDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const row = useVisitsStore((s) => s.landlordVisits.find((v) => v.id === id));

  const [shareLocation, setShareLocation] = useState(true);
  const [shareContact, setShareContact] = useState(true);

  const name = row?.tenantName ?? 'the tenant';
  const firstName = name.split(' ')[0] ?? name;
  const visitLine = row ? `${dayLabel(row.requestedDate)} · ${SLOT_START[row.timeSlot]}` : '';

  const canSend = shareLocation || shareContact;

  const handleSend = () => {
    if (!canSend) return;
    router.push({
      pathname: '/(landlord)/share-confirmation',
      params: { id: row?.id ?? '' },
    } as any);
  };

  return (
    <ScreenShell title="Share Details" showBack paddingBottom={32}>
      {/* Accepted banner */}
      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.2} />
        </View>
        <View style={styles.bannerCopy}>
          <Text style={styles.bannerTitle}>Visit accepted</Text>
          {visitLine ? (
            <Text style={styles.bannerMeta}>
              {name} · {visitLine}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Headline block — tight pair, spaced by the shell stack */}
      <View>
        <Text style={styles.headline}>Share with {firstName}</Text>
        <Text style={styles.subcopy}>
          Choose what to send so {firstName} can find the place and reach you.
        </Text>
      </View>

      {/* Location card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <MapPin size={16} color={c.accent} strokeWidth={2} />
          </View>
          <View style={styles.cardHeaderCopy}>
            <Text style={styles.cardTitle}>Pin location</Text>
            <Text style={styles.cardDesc}>Exact GPS pin to the building entrance.</Text>
          </View>
          <Toggle on={shareLocation} onToggle={() => setShareLocation((v) => !v)} />
        </View>

        {shareLocation ? (
          <View style={styles.mapBlock}>
            <View style={styles.mapPreview}>
              <View style={[styles.street, styles.streetWide, { top: '33%' }]} />
              <View style={[styles.street, styles.streetWide, { top: '66%' }]} />
              <View style={[styles.street, styles.streetThin, { left: '25%' }]} />
              <View style={[styles.street, styles.streetThin, { left: '50%' }]} />
              <View style={styles.mapPin}>
                <MapPin size={16} color="#FFFFFF" strokeWidth={2.2} />
              </View>
              <View style={styles.mapPinDot} />
            </View>
            <Text style={styles.addressTitle}>{ADDRESS}</Text>
            <Text style={styles.addressSub}>{ADDRESS_SUB}</Text>
          </View>
        ) : null}
      </View>

      {/* Contact card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIcon}>
            <Phone size={16} color={c.accent} strokeWidth={2} />
          </View>
          <View style={styles.cardHeaderCopy}>
            <Text style={styles.cardTitle}>Contact number</Text>
            <Text style={styles.cardDesc}>Tenant can call you to coordinate.</Text>
          </View>
          <Toggle on={shareContact} onToggle={() => setShareContact((v) => !v)} />
        </View>

        {shareContact ? (
          <View style={styles.phonePanel}>
            <View style={styles.phoneCopy}>
              <Text style={styles.phoneLabel}>Primary number</Text>
              <Text style={styles.phoneValue}>{PHONE}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Copy phone number"
              style={styles.copyBtn}>
              <Copy size={13} color={c.ink} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Sharing with */}
      <View style={styles.sharingPanel}>
        <Avatar name={name} size={36} />
        <Text style={styles.sharingText}>
          Sharing with <Text style={styles.sharingName}>{name}</Text>
        </Text>
      </View>

      {/* Privacy note */}
      <View style={styles.privacyRow}>
        <ShieldCheck size={12} color={c.accent} strokeWidth={2.2} />
        <Text style={styles.privacyText}>
          Details stay private to this tenant for the visit window. You can revoke anytime.
        </Text>
      </View>

      {/* Send */}
      <TouchableOpacity
        onPress={handleSend}
        disabled={!canSend}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`Send to ${firstName}`}
        style={[styles.sendBtn, !canSend && styles.sendDisabled]}>
        <Text style={styles.sendText}>Send to {firstName}</Text>
        <ArrowRight size={16} color="#FFFFFF" strokeWidth={2} />
      </TouchableOpacity>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: c.greenBg,
    padding: 14,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },
  bannerTitle: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  bannerMeta: {
    marginTop: 2,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.accent,
  },
  headline: {
    fontFamily: font.serif,
    fontSize: 22,
    color: c.ink,
  },
  subcopy: {
    marginTop: 6,
    fontFamily: font.sans,
    fontSize: 12,
    lineHeight: 18,
    color: c.meta,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    ...shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: c.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  cardDesc: {
    marginTop: 2,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.meta,
  },
  mapBlock: {
    marginTop: 16,
  },
  mapPreview: {
    height: 130,
    borderRadius: 14,
    backgroundColor: '#E0E6DC',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  street: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  streetWide: {
    height: 6,
    left: 0,
    right: 0,
  },
  streetThin: {
    width: 3,
    top: 0,
    bottom: 0,
  },
  mapPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: c.ink,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: c.ink,
    marginTop: -4,
  },
  addressTitle: {
    marginTop: 12,
    fontFamily: font.sansSemi,
    fontSize: 11,
    color: c.ink,
  },
  addressSub: {
    marginTop: 2,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.meta,
  },
  phonePanel: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: c.surfaceAlt,
    padding: 12,
    marginTop: 16,
  },
  phoneCopy: {
    flex: 1,
    minWidth: 0,
  },
  phoneLabel: {
    fontFamily: font.sans,
    fontSize: 10,
    color: c.faint,
  },
  phoneValue: {
    marginTop: 3,
    fontFamily: font.sansSemi,
    fontSize: 15,
    letterSpacing: 0.5,
    color: c.ink,
  },
  copyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  sharingPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: c.surfaceAlt,
    padding: 12,
  },
  sharingText: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    fontFamily: font.sans,
    fontSize: 12,
    color: c.meta,
  },
  sharingName: {
    fontFamily: font.sansSemi,
    color: c.ink,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  privacyText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: font.sans,
    fontSize: 10,
    lineHeight: 15,
    color: '#888888',
  },
  sendBtn: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: c.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    opacity: 0.4,
  },
  sendText: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: '#FFFFFF',
    marginRight: 8,
  },
});
