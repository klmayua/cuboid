'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuthStore, selectIsAuthenticated, selectIsOnboardingComplete } from '@/features/auth';

const isMockMode =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   document.cookie.includes('mock=true'));

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
      <main className="flex-1 ml-64 relative">
        {isMockMode && (
          <div className="absolute top-4 right-4 z-50">
            <div className="px-3 py-1.5 rounded-[10px] bg-[#0B1020] border border-[#D4AF37]/40 text-[10px] font-medium tracking-wider text-[#D4AF37] uppercase">
              Simulation Mode
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
