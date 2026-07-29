import { useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, X } from 'lucide-react-native';

import { tokens } from '@/src/theme/tokens';

const { color, space, radius, font, size } = tokens;

// ─── Reason options ──────────────────────────────────────────────────────────

const REASONS = [
  'Already rented out',
  'Tenant profile not a fit',
  'Time does not work',
  'Budget mismatch',
  'Other',
] as const;

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function DeclineRequestScreen() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string>('Already rented out');
  const [message, setMessage] = useState(
    'Thanks for your interest \u2014 wishing you luck finding the right place.',
  );

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSendDecline = useCallback(() => {
    // TODO: submit decline with { selectedReason, message }
    router.push('/(landlord)/(tabs)/requests' as any);
  }, [router]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* ─── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          onPress={handleGoBack}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <ArrowLeft size={18} color={color.ink} strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Decline Request</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ─── Warning Banner ────────────────────────────────────────── */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIcon}>
            <X size={20} color="#FFFFFF" strokeWidth={3} />
          </View>
          <View style={styles.warningTextWrap}>
            <Text style={styles.warningTitle}>Decline this visit?</Text>
            <Text style={styles.warningSub}>Sandeep will be notified with your reason.</Text>
          </View>
        </View>

        {/* ─── Pick a Reason ─────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>PICK A REASON</Text>

        <View style={styles.reasonCard} accessibilityRole="radiogroup">
          {REASONS.map((reason, i) => {
            const active = reason === selectedReason;
            return (
              <Pressable
                key={reason}
                onPress={() => setSelectedReason(reason)}
                style={[
                  styles.reasonRow,
                  i < REASONS.length - 1 && styles.reasonRowBorder,
                ]}
                accessibilityLabel={reason}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}>
                <Text style={styles.reasonText}>{reason}</Text>
                <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                  {active && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ─── Optional Message ──────────────────────────────────────── */}
        <View style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            placeholder="Message (optional)"
            placeholderTextColor={color.placeholder}
            multiline
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* ─── Bottom Actions ──────────────────────────────────────────── */}
      <View style={styles.bottomArea}>
        <Pressable
          onPress={handleSendDecline}
          style={styles.destructiveCta}
          accessibilityLabel="Send decline"
          accessibilityRole="button">
          <Text style={styles.destructiveCtaText}>Send decline</Text>
        </Pressable>

        <Pressable
          onPress={handleCancel}
          style={styles.cancelCta}
          accessibilityLabel="Cancel"
          accessibilityRole="button">
          <Text style={styles.cancelCtaText}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.bg,
  },

  // Header
  header: {
    height: space.headerH,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    paddingHorizontal: space.screenH,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: color.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 40,
  },
  headerTitle: {
    fontFamily: font.semibold,
    fontSize: 17,
    color: color.ink,
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.screenH,
    paddingTop: 20,
    paddingBottom: 16,
  },

  // Warning banner
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: radius.card,
    padding: space.cardPad,
    gap: 12,
  },
  warningIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTextWrap: {
    flex: 1,
  },
  warningTitle: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.ink,
  },
  warningSub: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    color: '#9B1C1C',
    marginTop: 2,
  },

  // Section label
  sectionLabel: {
    fontFamily: font.bold,
    fontSize: size.caption,
    color: color.ink3,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 24,
  },

  // Reason radio card
  reasonCard: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    marginTop: 12,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: space.cardPad,
  },
  reasonRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: color.rowDivider,
  },
  reasonText: {
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: color.ink3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: color.ink,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: color.ink,
  },

  // Message input
  messageCard: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    padding: space.cardPad,
    marginTop: 14,
  },
  messageInput: {
    fontFamily: font.sans,
    fontSize: size.body,
    color: color.ink,
    lineHeight: 22,
    minHeight: 80,
  },

  // Bottom buttons
  bottomArea: {
    paddingHorizontal: space.screenH,
    paddingBottom: space.safeBottom + 8,
    gap: 10,
    paddingTop: 8,
  },
  destructiveCta: {
    height: space.buttonH,
    borderRadius: radius.pill,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destructiveCtaText: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.bg,
  },
  cancelCta: {
    height: space.buttonH,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelCtaText: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.ink,
  },
});
