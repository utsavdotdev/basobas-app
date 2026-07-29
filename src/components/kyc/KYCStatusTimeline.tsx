import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check, X } from 'lucide-react-native';

import type { KYCStatus } from '@/src/types/kyc.types';
import { tokens } from '@/src/theme/tokens';

const { color, font, size, radius } = tokens;

type StepKey = 'submitted' | 'review' | 'decision';

interface Step {
  key: StepKey;
  label: string;
}

const STEPS: readonly Step[] = [
  { key: 'submitted', label: 'Submitted' },
  { key: 'review', label: 'Under Review' },
  { key: 'decision', label: 'Decision' },
];

interface Props {
  status: KYCStatus;
  submittedAt: string;
  reviewedAt?: string | null;
}

/**
 * Map a DB status to which timeline step is currently active.
 *   UNVERIFIED    → user never submitted (shouldn't render; defensive)
 *   UNDER_REVIEW  → "Under Review" is the active step
 *   VERIFIED      → "Decision" is the active step (green check)
 *   REJECTED      → "Decision" is the active step (red X)
 */
const resolveActiveStep = (status: KYCStatus): StepKey => {
  switch (status) {
    case 'UNVERIFIED':
      return 'submitted';
    case 'UNDER_REVIEW':
      return 'review';
    case 'VERIFIED':
    case 'REJECTED':
      return 'decision';
    default:
      return 'submitted';
  }
};

const formatTime = (iso: string | null | undefined): string | null => {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return null;
  }
};

/**
 * `KYCStatusTimeline` — horizontal 3-step tracker for the KYC Status screen.
 *
 * Visual states:
 *   - completed: filled brand-green circle with white check
 *   - active:    outlined brand-green circle
 *   - future:    outlined grey circle
 *   - decision-rejected: red X instead of green check
 *
 * Connectors: solid green between completed segments, dashed grey for future
 * ones, and brand-green leading up to the active node (the node itself
 * communicates "you are here").
 */
export const KYCStatusTimeline: React.FC<Props> = ({
  status,
  submittedAt,
  reviewedAt,
}) => {
  const active = resolveActiveStep(status);
  const isRejected = status === 'REJECTED';

  const submittedLabel = formatTime(submittedAt);
  const reviewedLabel = formatTime(reviewedAt ?? null);

  return (
    <View
      accessibilityLabel="Verification progress"
      style={styles.row}>
      {STEPS.map((step, idx) => {
        const isCompleted =
          (active === 'review' && step.key === 'submitted') ||
          ((active === 'decision' || isRejected) &&
            (step.key === 'submitted' || step.key === 'review'));
        const isActive = step.key === active;
        const isFuture =
          (active === 'submitted' && step.key !== 'submitted') ||
          (active === 'review' && step.key === 'decision');

        const showCheck = isCompleted && step.key === 'decision' && !isRejected;
        const showX = isCompleted && step.key === 'decision' && isRejected;

        // Connector before this node — skip on the first column.
        // Completed segments and the segment leading to the active node are
        // both drawn solid brand-green; only future segments stay dashed grey.
        const connectorStyle =
          idx === 0
            ? null
            : isCompleted || isActive
            ? styles.connectorCompleted
            : styles.connectorFuture;

        return (
          <React.Fragment key={step.key}>
            {connectorStyle && <View style={[styles.connector, connectorStyle]} />}

            <View style={styles.col}>
              <View
                style={[
                  styles.node,
                  isCompleted && styles.nodeCompleted,
                  isActive && styles.nodeActive,
                  isFuture && styles.nodeFuture,
                  isRejected && step.key === 'decision' && styles.nodeRejected,
                ]}>
                {showCheck ? (
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                ) : showX ? (
                  <X size={14} color="#FFFFFF" strokeWidth={3} />
                ) : null}
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {step.label}
              </Text>
              <Text style={styles.timestamp}>
                {step.key === 'submitted' && submittedLabel ? submittedLabel : ' '}
                {step.key === 'review' && reviewedLabel ? reviewedLabel : ' '}
                {/* decision: blank — terminal state shows nothing here */}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

KYCStatusTimeline.displayName = 'KYCStatusTimeline';

const NODE_SIZE = 28;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  col: {
    alignItems: 'center',
    width: 84,
  },
  connector: {
    height: 2,
    flex: 1,
    marginTop: NODE_SIZE / 2 - 1,
  },
  connectorCompleted: {
    backgroundColor: color.brand,
  },
  connectorFuture: {
    backgroundColor: 'transparent',
    borderTopWidth: 1.5,
    borderColor: color.line,
    borderStyle: 'dashed',
    height: 0,
  },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: radius.pill,
    backgroundColor: color.bg,
    borderWidth: 2,
    borderColor: color.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCompleted: {
    backgroundColor: color.brand,
    borderColor: color.brand,
  },
  nodeActive: {
    borderColor: color.brand,
    borderWidth: 2.5,
  },
  nodeFuture: {
    borderColor: color.line,
  },
  nodeRejected: {
    backgroundColor: color.danger,
    borderColor: color.danger,
  },
  label: {
    fontFamily: font.medium,
    fontSize: size.caption,
    color: color.ink2,
    marginTop: 8,
    textAlign: 'center',
  },
  labelActive: {
    color: color.ink,
    fontFamily: font.semibold,
  },
  timestamp: {
    fontFamily: font.sans,
    fontSize: size.micro + 1,
    color: color.ink3,
    marginTop: 2,
    textAlign: 'center',
    minHeight: 14,
  },
});