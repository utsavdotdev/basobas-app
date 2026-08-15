import { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Clock } from 'lucide-react-native';

import { DetailHeader } from '@/src/components/visit/DetailHeader';
import { VStack } from '@/src/components/visit/VStack';
import { SectionLabel } from '@/src/components/visit/SectionLabel';
import { Button } from '@/src/components/visit/Button';
import { c, font, radius, sp, t } from '@/src/theme/visitTokens';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import { tenantRescheduleVisit } from '@/src/services/visits.service';
import { toTimeSlot } from '@/src/types/property.types';

// ─── Day data ────────────────────────────────────────────────────────────────

interface DayOption {
  label: string;
  date: number;
}

const DAYS: DayOption[] = [
  { label: 'Mon', date: 9 },
  { label: 'Tue', date: 10 },
  { label: 'Wed', date: 11 },
  { label: 'Thu', date: 12 },
  { label: 'Fri', date: 13 },
  { label: 'Sat', date: 14 },
];

// ─── Time slots ──────────────────────────────────────────────────────────────

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function RescheduleVisitScreen() {
  const router = useRouter();
  const supabase = useClerkSupabase();
  const { visitId } = useLocalSearchParams<{ visitId?: string }>();
  const [selectedDate, setSelectedDate] = useState<number>(11);
  const [selectedTime, setSelectedTime] = useState('4:00 PM');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    if (!visitId) {
      router.back();
      return;
    }
    setSending(true);
    // DAYS are fixed day-of-month options in the current month.
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), selectedDate);
    const result = await tenantRescheduleVisit(
      visitId,
      date.toISOString().slice(0, 10),
      toTimeSlot(selectedTime),
      supabase
    );
    setSending(false);
    if (!result.success) {
      // TODO: surface a proper error toast when the app has one.
      console.warn('[Reschedule] failed:', result.error);
      return;
    }
    router.back();
  }, [visitId, selectedDate, selectedTime, supabase, router]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <DetailHeader title="Reschedule Visit" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <VStack gap={sp.base}>
          <Text style={styles.intro}>
            Propose a new time — your host will be notified to confirm.
          </Text>

          {/* ─── Pick a Day ────────────────────────────────────────────── */}
          <SectionLabel label="Pick a day" />

          <View style={styles.dayRow}>
            {DAYS.map((d, i) => {
              const active = d.date === selectedDate;
              return (
                <Pressable
                  key={d.date}
                  onPress={() => setSelectedDate(d.date)}
                  style={[
                    styles.dayCard,
                    active && styles.dayCardActive,
                    i > 0 && styles.cellSpacing,
                  ]}
                  accessibilityLabel={`${d.label} ${d.date}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}>
                  <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{d.label}</Text>
                  <Text style={[styles.dayNumber, active && styles.dayNumberActive]}>{d.date}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* ─── Pick a Time ───────────────────────────────────────────── */}
          <SectionLabel label="Pick a time" />

          <View style={styles.timeGrid}>
            {TIME_SLOTS.slice(0, 3).map((time, i) => {
              const active = time === selectedTime;
              return (
                <Pressable
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timePill,
                    active && styles.timePillActive,
                    i > 0 && styles.cellSpacing,
                  ]}
                  accessibilityLabel={time}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}>
                  <Clock size={14} color={active ? c.screenBg : c.meta} strokeWidth={1.75} />
                  <Text style={[styles.timeText, active && styles.timeTextActive]}>{time}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.timeGrid}>
            {TIME_SLOTS.slice(3).map((time, i) => {
              const active = time === selectedTime;
              return (
                <Pressable
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={[
                    styles.timePill,
                    active && styles.timePillActive,
                    i > 0 && styles.cellSpacing,
                  ]}
                  accessibilityLabel={time}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}>
                  <Clock size={14} color={active ? c.screenBg : c.meta} strokeWidth={1.75} />
                  <Text style={[styles.timeText, active && styles.timeTextActive]}>{time}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* ─── Note ──────────────────────────────────────────────────── */}
          <SectionLabel label="Note for the host (optional)" />

          <TextInput
            style={styles.noteInput}
            placeholder="Write your thoughts here…"
            placeholderTextColor={c.faint}
            multiline
            value={note}
            onChangeText={setNote}
            textAlignVertical="top"
          />

          {/* ─── CTA ───────────────────────────────────────────────────── */}
          <Button variant="primary" onPress={handleSend} disabled={sending} style={styles.cta}>
            Send new time
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: c.screenBg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: sp.lg,
    paddingTop: sp.lg,
    paddingBottom: 48,
  },
  intro: {
    fontFamily: font.sans,
    fontSize: t.meta,
    color: c.meta,
    lineHeight: 20,
  },
  // Day picker
  dayRow: {
    flexDirection: 'row',
  },
  cellSpacing: {
    marginLeft: sp.md,
  },
  dayCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: radius.control,
    backgroundColor: c.cardBg,
    paddingVertical: sp.base,
  },
  dayCardActive: {
    backgroundColor: c.ink,
  },
  dayLabel: {
    fontFamily: font.sans,
    fontSize: t.label,
    color: c.meta,
  },
  dayLabelActive: {
    color: c.screenBg,
  },
  dayNumber: {
    fontFamily: font.sansSemi,
    fontSize: 17,
    color: c.title,
    marginTop: 4,
  },
  dayNumberActive: {
    color: c.screenBg,
  },
  // Time picker
  timeGrid: {
    flexDirection: 'row',
  },
  timePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: c.cardBg,
    paddingVertical: sp.base,
    paddingHorizontal: sp.md,
  },
  timePillActive: {
    backgroundColor: c.ink,
  },
  timeText: {
    fontFamily: font.sans,
    fontSize: t.meta,
    color: c.title,
    marginLeft: sp.sm,
  },
  timeTextActive: {
    fontFamily: font.sansSemi,
    color: c.screenBg,
  },
  // Note input
  noteInput: {
    minHeight: 96,
    borderRadius: radius.control,
    backgroundColor: c.cardBg,
    padding: sp.base,
    fontFamily: font.sans,
    fontSize: t.body,
    color: c.title,
    lineHeight: 22,
  },
  cta: {
    marginTop: sp.sm,
  },
});
