import React from 'react';
import { useRouter } from 'expo-router';

import { OnboardingLayout } from '@/src/components/onboarding/OnboardingLayout';
import { VerifiedIllustration } from '@/src/components/onboarding/VerifiedIllustration';

export default function FeatureVerifiedScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout
      currentStep={1}
      overline="Only Verified"
      headline={'Real homes.\nVerified humans.'}
      body="Every listing on BasoBas is checked by our team. No catfish. No scams. Just the real deal."
      illustration={<VerifiedIllustration />}
      onSkip={() => router.replace('/(auth)/landing')}
      onNext={() => router.replace('/(auth)/feature-visits')}
    />
  );
}
