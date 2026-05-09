'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, selectIsAuthenticated } from '@/features/auth';

export default function RootAuthRedirect() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070D]">
      <div className="w-8 h-8 border-2 border-[#5E8DFF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
