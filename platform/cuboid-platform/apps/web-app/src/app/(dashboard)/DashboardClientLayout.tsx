'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuthStore, selectIsAuthenticated, selectIsOnboardingComplete } from '@/features/auth';

export function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isOnboardingComplete = useAuthStore(selectIsOnboardingComplete);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    } else if (!isOnboardingComplete) {
      router.push('/welcome');
    }
  }, [isAuthenticated, isOnboardingComplete, router]);

  if (!isAuthenticated || !isOnboardingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070D]">
        <div className="w-8 h-8 border-2 border-[#5E8DFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#05070D]">
      <AppSidebar />
      <main className="flex-1 ml-64">{children}</main>
    </div>
  );
}
