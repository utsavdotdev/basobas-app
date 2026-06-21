import React from 'react';
import { useRouter } from 'expo-router';

import { OnboardingLayout } from '@/src/components/onboarding/OnboardingLayout';
import { MapIllustration } from '@/src/components/onboarding/MapIllustration';

export default function FeatureMapScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout
      currentStep={3}
      overline="Search by area"
      headline={'Explore by\nneighborhood.'}
      body="See every verified rental on a live map. Filter by price, beds, and what matters most to you."
      illustration={<MapIllustration />}
      onSkip={() => router.replace('/(auth)/landing')}
      onNext={() => router.replace('/(auth)/landing')}
      isLast
    />
  );
}
