import { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/expo';
import { ShieldCheck, ShieldAlert, ShieldQuestion, Clock, XCircle } from 'lucide-react-native';

import { ScreenHeader } from '../../src/components/layout/ScreenHeader';
import { useClerkSupabase } from '@/src/hooks/useClerkSupabase';
import {
  getLandlordVerificationDetail,
  type LandlordVerificationStatus,
  type LandlordVerificationDetail,
} from '@/src/services/properties.service';

type StatusCopy = {
  Icon:    typeof ShieldCheck;
  color:   string;
  title:   string;
  subtext: string;
};

const STATUS_COPY: Record<LandlordVerificationStatus, StatusCopy> = {
  VERIFIED: {
    Icon:    ShieldCheck,
    color:   '#1A6B4A',
    title:   'Verified Landlord',
    subtext: 'Your documents have been approved. You can publish listings and receive visit requests.',
  },
  UNDER_REVIEW: {
    Icon:    Clock,
    color:   '#B7791F',
    title:   'Verification in review',
    subtext: 'We are checking your documents. This usually takes 1–2 business days.',
  },
  REJECTED: {
    Icon:    XCircle,
    color:   '#E53E3E',
    title:   'Verification rejected',
    subtext: 'Your documents could not be approved. Resubmit to publish listings.',
  },
  UNVERIFIED: {
    Icon:    ShieldQuestion,
    color:   '#6B6B6B',
    title:   'Not verified',
    subtext: 'Verify your identity to build trust with tenants and publish listings.',
  },
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function VerificationScreen() {
  const { user } = useUser();
  const supabase = useClerkSupabase();
  const clerkId = user?.id;

  const [detail, setDetail] = useState<LandlordVerificationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const load = useCallback(
    async (mode: 'initial' | 'refresh' = 'initial') => {
      if (!clerkId) return;
      if (mode === 'refresh') setRefreshing(true);
      else setLoading(true);

      const result = await getLandlordVerificationDetail(clerkId, supabase);

      if (result.success) {
        setDetail(result.data);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.error);
      }

      setLoading(false);
      setRefreshing(false);
    },
    [clerkId, supabase],
  );

  useEffect(() => {
    load('initial');
  }, [load]);

  const copy = detail ? STATUS_COPY[detail.status] : null;
  const submittedAt = formatDate(detail?.submittedAt ?? null);
  const reviewedAt = formatDate(detail?.reviewedAt ?? null);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title="Verification Status" showBack={true} centerTitle={true} />
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load('refresh')} />
        }>
        {loading ? (
          <View className="items-center py-20">
            <ActivityIndicator color="#1A6B4A" />
          </View>
        ) : errorMessage ? (
          <View className="mt-6 items-center rounded-card border border-line bg-bg p-5">
            <ShieldAlert size={40} color="#E53E3E" />
            <Text className="mt-3 text-center text-body-sm text-ink2">{errorMessage}</Text>
          </View>
        ) : copy ? (
          <>
            {/* Status Hero Card */}
            <View className="mb-6 items-center rounded-card border border-line bg-bg p-5">
              <copy.Icon size={48} color={copy.color} />
              <Text className="mt-3 font-semibold text-h2 text-ink">{copy.title}</Text>
              <Text className="mt-1 text-center text-body-sm text-ink2">{copy.subtext}</Text>
            </View>

            {/* Rejection reason */}
            {detail?.status === 'REJECTED' && detail.rejectReason ? (
              <View className="mb-6 rounded-card border border-line bg-bg p-4">
                <Text className="mb-1 font-semibold text-body-sm text-ink">Reason</Text>
                <Text className="text-body-sm leading-relaxed text-ink2">{detail.rejectReason}</Text>
              </View>
            ) : null}

            {/* Timeline */}
            {submittedAt || reviewedAt ? (
              <>
                <Text className="mb-2 font-semibold text-body-sm text-ink">Timeline</Text>
                <View className="mb-6 overflow-hidden rounded-card border border-line bg-bg">
                  {submittedAt ? (
                    <View
                      className={`flex-row items-center justify-between p-4 ${reviewedAt ? 'border-b border-row-divider' : ''}`}>
                      <Text className="text-body text-ink">Documents submitted</Text>
                      <Text className="text-caption text-ink2">{submittedAt}</Text>
                    </View>
                  ) : null}
                  {reviewedAt ? (
                    <View className="flex-row items-center justify-between p-4">
                      <Text className="text-body text-ink">Reviewed</Text>
                      <Text className="text-caption text-ink2">{reviewedAt}</Text>
                    </View>
                  ) : null}
                </View>
              </>
            ) : null}

            <Text className="text-center text-caption leading-relaxed text-ink2">
              Verification helps you build trust with potential tenants and receive more visit requests.
            </Text>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
