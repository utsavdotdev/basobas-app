import React from 'react';
import { useRouter } from 'expo-router';

import { OnboardingLayout } from '@/src/components/onboarding/OnboardingLayout';
import { VisitIllustration } from '@/src/components/onboarding/VisitIllustration';

export default function FeatureVisitsScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout
      currentStep={2}
      overline="Visits in seconds"
      headline={'Book a tour\nin one tap.'}
      body="Pick a time that works. Landlords confirm fast. Skip the back and forth on Viber."
      illustration={<VisitIllustration />}
      onSkip={() => router.replace('/(auth)/landing')}
      onNext={() => router.replace('/(auth)/feature-map')}
    />
  );
}
