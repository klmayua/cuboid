'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, selectIsAuthenticated, selectIsOnboardingComplete } from '@/features/auth';

export default function WelcomePage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isOnboardingComplete = useAuthStore(selectIsOnboardingComplete);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    } else if (isOnboardingComplete) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isOnboardingComplete, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070D] px-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">Welcome to CUBOID</h1>
        <p className="text-[#7183A6] mb-8">
          Complete your onboarding to unlock the full platform.
        </p>
        <button
          onClick={() => router.push('/kyc')}
          className="w-full py-3.5 bg-gradient-to-r from-[#0A2A66] to-[#123E91] text-white font-medium rounded-xl hover:shadow-lg transition-all"
        >
          Start Onboarding
        </button>
      </div>
    </div>
  );
}
