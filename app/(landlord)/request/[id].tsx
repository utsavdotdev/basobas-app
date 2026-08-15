import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useUser } from '@clerk/expo';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Clock,
  MessageSquareText,
  RefreshCw,
  X,
} from 'lucide-react-native';

import {
  Avatar,
  LdCard,
  LdSectionLabel,
  ScreenShell,
  StatusPill,
  type LdStatus,
} from '@/src/components/visit/LandlordUI';
import { useVisitsStore } from '@/src/store/visitsStore';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import { c, font, radius, shadow } from '@/src/theme/visitTokens';
import { TIME_SLOT_LABELS, dayLabel, formatVisitDate } from '@/src/types/property.types';
import type { LandlordFollowUpOutcome, LandlordRequestUi } from '@/src/types/property.types';

// ─── Mappings ────────────────────────────────────────────────────────────────

const UI_TO_PILL: Record<LandlordRequestUi, LdStatus> = {
  new: 'Pending',
  upcoming: 'Accepted',
  rescheduled: 'Rescheduled',
  discussion: 'Pending',
  completed: 'Accepted',
  finalized: 'Accepted',
  cancelled: 'Declined',
  rejected: 'Declined',
};

const UI_LABEL: Record<LandlordRequestUi, string> = {
  new: 'Awaiting your review',
  upcoming: 'Visit confirmed',
  rescheduled: 'New time proposed — awaiting the tenant',
  completed: 'Visit completed',
  discussion: 'In discussion',
  finalized: 'Rental finalized',
  cancelled: 'Cancelled by tenant',
  rejected: 'Request declined',
};

const FOLLOW_UP_ROWS: { key: LandlordFollowUpOutcome; label: string; sub: string }[] = [
  {
    key: 'tenant_visited',
    label: 'Tenant Visited',
    sub: 'Mark the visit as done — opens discussion',
  },
  { key: 'tenant_did_not_visit', label: 'Tenant Did Not Visit', sub: 'Archive this request' },
  { key: 'discussion_ongoing', label: 'Discussion Ongoing', sub: 'Keep the request open' },
  { key: 'finalize_rental', label: 'Finalize Rental', sub: 'Close the deal with this tenant' },
];

const compactPrice = (price: number | null): string | null =>
  price == null ? null : `NPR ${Math.round(price / 1000)}k`;

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function RequestDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const supabase = useClerkSupabase();
  const { user } = useUser();

  const row = useVisitsStore((s) => s.landlordVisits.find((v) => v.id === id));
  const landlordVisits = useVisitsStore((s) => s.landlordVisits);
  const fetchLandlordVisits = useVisitsStore((s) => s.fetchLandlordVisits);
  const acceptVisit = useVisitsStore((s) => s.acceptVisit);
  const landlordSubmitFollowUp = useVisitsStore((s) => s.landlordSubmitFollowUp);
  const finalizeVisit = useVisitsStore((s) => s.finalizeVisit);

  const [busy, setBusy] = useState(false);
  const [confirmFinalize, setConfirmFinalize] = useState(false);

  useEffect(() => {
    if (id && landlordVisits.length === 0 && user?.id) {
      fetchLandlordVisits(supabase, user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.id]);

  const handleAccept = useCallback(async () => {
    if (!row || busy) return;
    setBusy(true);
    const ok = await acceptVisit(row.id, supabase);
    setBusy(false);
    if (ok) {
      router.push({ pathname: '/(landlord)/share-details', params: { id: row.id } } as any);
    }
  }, [row, busy, acceptVisit, supabase, router]);

  const handleDecline = useCallback(() => {
    if (!row) return;
    router.push({ pathname: '/(landlord)/decline-request', params: { id: row.id } } as any);
  }, [row, router]);

  const handleReschedule = useCallback(() => {
    if (!row) return;
    router.push({ pathname: '/(landlord)/reschedule', params: { id: row.id } } as any);
  }, [row, router]);

  const handleFollowUp = useCallback(
    async (outcome: LandlordFollowUpOutcome) => {
      if (!row || busy) return;
      if (outcome === 'finalize_rental') {
        setConfirmFinalize(true);
        return;
      }
      setBusy(true);
      await landlordSubmitFollowUp(row.id, outcome, supabase);
      setBusy(false);
    },
    [row, busy, landlordSubmitFollowUp, supabase]
  );

  const handleFinalize = useCallback(async () => {
    if (!row || busy) return;
    setConfirmFinalize(false);
    setBusy(true);
    const ok = await finalizeVisit(row.id, supabase);
    setBusy(false);
    if (ok) {
      Alert.alert(
        'Rental Finalized',
        'This request is now finalized and other open requests for this property were closed.',
        [{ text: 'Done', onPress: () => router.back() }]
      );
    }
  }, [row, busy, finalizeVisit, supabase, router]);

  if (!row) {
    return (
      <ScreenShell title="Visit Request" showBack>
        <View style={styles.center}>
          {landlordVisits.length === 0 ? (
            <ActivityIndicator color="#1A6B4A" />
          ) : (
            <Text style={styles.centerText}>This request is no longer available.</Text>
          )}
        </View>
      </ScreenShell>
    );
  }

  const isPending = row.uiStatus === 'new';
  const isRescheduled = row.uiStatus === 'rescheduled';
  const isFollowUp = row.uiStatus === 'completed' || row.uiStatus === 'discussion';
  const isTerminal = ['finalized', 'cancelled', 'rejected'].includes(row.uiStatus);
  const price = compactPrice(row.propertyPrice);

  return (
    <ScreenShell title="Visit Request" showBack paddingBottom={32}>
      {/* Applicant row */}
      <View style={styles.applicantRow}>
        <Avatar name={row.tenantName ?? 'Tenant'} size={56} />
        <View style={styles.applicantCopy}>
          <View style={styles.applicantNameRow}>
            <Text numberOfLines={1} style={styles.applicantName}>
              {row.tenantName ?? 'A tenant'}
            </Text>
            <BadgeCheck size={16} color={c.accent} strokeWidth={2} />
          </View>
          <Text style={styles.applicantMeta}>
            {row.propertyTitle ? `${row.propertyTitle} · ` : ''}Requested{' '}
            {formatVisitDate(row.requestedDate)}
          </Text>
        </View>
      </View>

      {/* Status line */}
      <View style={styles.statusLine}>
        <StatusPill status={UI_TO_PILL[row.uiStatus]} />
        <Text style={styles.statusNote}>{UI_LABEL[row.uiStatus]}</Text>
      </View>

      {/* Property */}
      <LdSectionLabel label="Property" />
      <View style={styles.propertyPanel}>
        <View style={styles.propertyThumb}>
          <Text style={styles.propertyThumbText}>{row.propertyTitle?.[0] ?? 'P'}</Text>
        </View>
        <View style={styles.propertyCopy}>
          <Text numberOfLines={1} style={styles.propertyTitle}>
            {row.propertyTitle ?? 'Your listing'}
          </Text>
          <View style={styles.propertyAreaRow}>
            <Text style={styles.propertyArea}>Baluwatar, Kathmandu</Text>
          </View>
        </View>
        {price ? (
          <View style={styles.propertyPriceWrap}>
            <Text style={styles.propertyPrice}>{price}</Text>
            <Text style={styles.propertyPriceMo}>/mo</Text>
          </View>
        ) : null}
      </View>

      {/* Requested visit */}
      <LdSectionLabel label="Requested Visit" />
      <LdCard padding={16} radius={18}>
        <View style={styles.visitSplit}>
          <View style={styles.visitHalf}>
            <View style={styles.visitIcon}>
              <Calendar size={15} color={c.ink} strokeWidth={2} />
            </View>
            <Text style={styles.visitLabel}>Date</Text>
            <Text style={styles.visitValue}>{dayLabel(row.requestedDate)}</Text>
          </View>
          <View style={styles.visitDivider} />
          <View style={styles.visitHalf}>
            <View style={styles.visitIcon}>
              <Clock size={15} color={c.ink} strokeWidth={2} />
            </View>
            <Text style={styles.visitLabel}>Time</Text>
            <Text style={styles.visitValue}>{TIME_SLOT_LABELS[row.timeSlot]}</Text>
          </View>
        </View>
      </LdCard>

      {/* Original vs proposed — rescheduled only */}
      {isRescheduled && row.previousRequestedDate && (
        <View style={styles.proposedCard}>
          <Text style={styles.proposedOld}>
            Original · {formatVisitDate(row.previousRequestedDate)} ·{' '}
            {TIME_SLOT_LABELS[row.timeSlot]}
          </Text>
          <Text style={styles.proposedNew}>Proposed · {formatVisitDate(row.requestedDate)}</Text>
        </View>
      )}

      {/* Note */}
      {row.note ? (
        <>
          <LdSectionLabel label="Note from Tenant" />
          <View style={styles.notePanel}>
            <MessageSquareText size={15} color={c.faint} strokeWidth={2} style={styles.noteIcon} />
            <Text style={styles.noteBody}>{row.note}</Text>
          </View>
        </>
      ) : null}

      {/* Follow-up rows — completed / discussion */}
      {isFollowUp ? (
        <>
          <LdSectionLabel label="Follow-Up" />
          <LdCard padding={0} radius={18}>
            {FOLLOW_UP_ROWS.map((opt, i) => (
              <TouchableOpacity
                key={opt.key}
                onPress={() => handleFollowUp(opt.key)}
                disabled={busy}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={opt.label}
                style={[styles.followRow, i < FOLLOW_UP_ROWS.length - 1 && styles.followRowBorder]}>
                <View style={styles.followCopy}>
                  <Text style={styles.followLabel}>{opt.label}</Text>
                  <Text style={styles.followSub}>{opt.sub}</Text>
                </View>
                <ArrowRight size={14} color={c.meta} strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </LdCard>
        </>
      ) : null}

      {/* Terminal note */}
      {isTerminal ? (
        <View style={styles.terminalNote}>
          <Text style={styles.terminalText}>
            This request is {UI_LABEL[row.uiStatus].toLowerCase()} and no longer needs action.
          </Text>
        </View>
      ) : null}

      {/* Actions — pending only */}
      {isPending ? (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleAccept}
            disabled={busy}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Accept and share details"
            style={[styles.acceptBtn, busy && styles.disabled]}>
            {busy ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.acceptBtnText}>Accept & Share Details</Text>
            )}
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleReschedule}
              disabled={busy}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Reschedule"
              style={[styles.secondaryBtn, styles.rescheduleBtn]}>
              <RefreshCw size={14} color={c.ink} strokeWidth={2} />
              <Text style={styles.secondaryBtnText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDecline}
              disabled={busy}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Decline request"
              style={[styles.secondaryBtn, styles.declineBtn]}>
              <X size={15} color="#C0392B" strokeWidth={2.2} />
              <Text style={styles.declineBtnText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Finalize confirm modal */}
      <Modal visible={confirmFinalize} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Finalize rental with {row.tenantName ?? 'this tenant'}?
            </Text>
            <Text style={styles.modalBody}>
              This will close all other open requests for this property.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setConfirmFinalize(false)}
                activeOpacity={0.8}
                accessibilityRole="button"
                style={[styles.secondaryBtn, styles.modalCancel]}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleFinalize}
                disabled={busy}
                activeOpacity={0.85}
                accessibilityRole="button"
                style={[styles.acceptBtn, styles.modalConfirm, busy && styles.disabled]}>
                {busy ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.acceptBtnText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenShell>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 120,
  },
  centerText: {
    fontFamily: font.sans,
    fontSize: 13,
    color: c.meta,
  },
  applicantRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicantCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 14,
  },
  applicantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicantName: {
    fontFamily: font.sansSemi,
    fontSize: 17,
    color: c.ink,
    marginRight: 6,
  },
  applicantMeta: {
    marginTop: 4,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.faint,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusNote: {
    fontFamily: font.sans,
    fontSize: 11,
    color: c.meta,
    marginLeft: 10,
  },
  propertyPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: c.surfaceAlt,
    padding: 12,
  },
  propertyThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#D4DDD0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyThumbText: {
    fontFamily: font.sansSemi,
    fontSize: 18,
    color: c.accent,
  },
  propertyCopy: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
  },
  propertyTitle: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  propertyAreaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  propertyArea: {
    fontFamily: font.sans,
    fontSize: 10,
    color: c.faint,
  },
  propertyPriceWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  propertyPrice: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.accent,
  },
  propertyPriceMo: {
    fontFamily: font.sans,
    fontSize: 10,
    color: c.faint,
    marginLeft: 2,
    marginBottom: 1,
  },
  visitSplit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitHalf: {
    flex: 1,
    alignItems: 'center',
  },
  visitIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: c.surfaceGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  visitLabel: {
    fontFamily: font.sans,
    fontSize: 10,
    color: c.faint,
  },
  visitValue: {
    marginTop: 4,
    fontFamily: font.sansSemi,
    fontSize: 12,
    color: c.ink,
  },
  visitDivider: {
    width: 1,
    height: 32,
    backgroundColor: c.hairline,
  },
  proposedCard: {
    borderRadius: 18,
    backgroundColor: '#EAF0FB',
    padding: 16,
  },
  proposedOld: {
    fontFamily: font.sans,
    fontSize: 12,
    color: c.meta,
    textDecorationLine: 'line-through',
  },
  proposedNew: {
    marginTop: 6,
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: '#3B5BA5',
  },
  notePanel: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 18,
    backgroundColor: c.surfaceAlt,
    padding: 16,
  },
  noteIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  noteBody: {
    flex: 1,
    fontFamily: font.sans,
    fontSize: 12,
    lineHeight: 18,
    color: c.inkSub,
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  followRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: c.hairlineSoft,
  },
  followCopy: {
    flex: 1,
    minWidth: 0,
    marginRight: 12,
  },
  followLabel: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
  },
  followSub: {
    marginTop: 2,
    fontFamily: font.sans,
    fontSize: 11,
    color: c.faint,
  },
  terminalNote: {
    borderRadius: 18,
    backgroundColor: c.surfaceAlt,
    padding: 16,
  },
  terminalText: {
    fontFamily: font.sans,
    fontSize: 12,
    lineHeight: 18,
    color: c.faint,
    textAlign: 'center',
  },
  actions: {},
  acceptBtn: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: c.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtnText: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: '#FFFFFF',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  secondaryBtn: {
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rescheduleBtn: {
    flex: 1,
    backgroundColor: c.surfaceGrey,
    marginRight: 10,
  },
  declineBtn: {
    flex: 1,
    backgroundColor: '#FDECEC',
  },
  secondaryBtnText: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: c.ink,
    marginLeft: 6,
  },
  declineBtnText: {
    fontFamily: font.sansSemi,
    fontSize: 13,
    color: '#C0392B',
    marginLeft: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  modalWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 32,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 24,
    ...shadow.card,
  },
  modalTitle: {
    fontFamily: font.sansSemi,
    fontSize: 17,
    color: c.ink,
    lineHeight: 24,
  },
  modalBody: {
    marginTop: 8,
    fontFamily: font.sans,
    fontSize: 13,
    lineHeight: 20,
    color: c.meta,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalCancel: {
    flex: 1,
    backgroundColor: c.surfaceGrey,
    marginRight: 10,
  },
  modalConfirm: {
    flex: 2,
  },
});
