import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { PrimaryButton } from '@/src/components/shared/PrimaryButton';
import { tokens } from '@/src/theme/tokens';

const { color, font, size, radius, space } = tokens;

interface Props {
  rejectionReason: string | null;
  /** Optional: a small heading override. */
  title?: string;
}

/**
 * `KYCRejectionNotice` — the red-bordered card rendered when the latest
 * KYC submission has status `REJECTED`.
 *
 * Shows the raw `rejection_reason` from the database (no paraphrasing) and a
 * primary CTA that routes back into the Upload screen with prior documents
 * pre-filled, so the tenant only has to replace the flagged one.
 */
export const KYCRejectionNotice: React.FC<Props> = ({
  rejectionReason,
  title = 'Verification Rejected',
}) => {
  const router = useRouter();

  return (
    <View
      style={styles.card}
      accessibilityLabel={`${title}. ${rejectionReason ?? ''}`}>
      <View style={styles.headerRow}>
        <AlertCircle size={18} color={color.danger} strokeWidth={2.2} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.reason}>
        {rejectionReason && rejectionReason.trim().length > 0
          ? rejectionReason
          : 'No reason was provided. Please resubmit updated documents.'}
      </Text>

      <PrimaryButton
        label="Resubmit Documents"
        onPress={() => router.push('/(tenant)/kyc-upload?resubmit=true' as any)}
        style={styles.cta}
      />
    </View>
  );
};

KYCRejectionNotice.displayName = 'KYCRejectionNotice';

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.bg,
    borderLeftWidth: 4,
    borderLeftColor: color.danger,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: color.line,
    borderRightColor: color.line,
    borderBottomColor: color.line,
    borderTopLeftRadius: radius.card,
    borderBottomLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
    borderBottomRightRadius: radius.card,
    padding: space.cardPad,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: font.semibold,
    fontSize: size.body,
    color: color.danger,
  },
  reason: {
    fontFamily: font.sans,
    fontSize: size.bodySm,
    lineHeight: 20,
    color: color.ink,
  },
  cta: {
    marginTop: 4,
  },
});