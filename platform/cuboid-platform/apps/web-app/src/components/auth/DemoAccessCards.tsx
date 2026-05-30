'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Building2, Landmark, Wallet, ShieldCheck, Loader2, Crown, Users, BarChart3, HeartHandshake } from 'lucide-react';
import { DEMO_USERS } from '@/lib/demo-users';
import { performDemoLogin } from '@/lib/auth/demo-login';
import type { DemoUser } from '@/lib/demo-users';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Building2,
  Landmark,
  Wallet,
  ShieldCheck,
  Crown,
  Users,
  BarChart3,
  HeartHandshake,
};

const DEMO_TIMEOUT_MS = 2000;

export function DemoAccessCards() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafeguard = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleDemoLogin = useCallback(
    (demoUser: DemoUser) => {
      setLoadingRole(demoUser.id);

      clearSafeguard();
      timeoutRef.current = setTimeout(() => {
        setLoadingRole(null);
      }, DEMO_TIMEOUT_MS);

      try {
        performDemoLogin(demoUser);
        setTimeout(() => {
          router.push(demoUser.redirectTo);
        }, 50);
      } catch (err) {
        clearSafeguard();
        setLoadingRole(null);
      }
    },
    [router, clearSafeguard]
  );

  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
          Demo Access
        </h2>
        <p className="text-xs text-[#7183A6] mt-1">
          Click any role to preview instantly. No password required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {DEMO_USERS.map((demoUser) => {
          const Icon = iconMap[demoUser.icon];
          const isLoading = loadingRole === demoUser.id;

          return (
            <button
              key={demoUser.id}
              type="button"
              disabled={loadingRole !== null}
              onClick={() => handleDemoLogin(demoUser)}
              aria-label={`Demo sign in as ${demoUser.title}`}
              className={`
                relative flex flex-col items-center text-center
                p-4 rounded-[18px]
                min-h-[220px] overflow-hidden
                bg-[#0A0E1E]/[0.92] backdrop-blur-md
                border border-[#D4AF37]/[0.18]
                transition-all duration-200 ease-out
                hover:border-[#D4AF37]/[0.45]
                hover:-translate-y-[2px]
                hover:shadow-[0_4px_24px_rgba(212,175,55,0.08)]
                focus:outline-none focus:ring-2 focus:ring-[#5E8DFF]/30 focus:ring-offset-2 focus:ring-offset-[#05070D]
                disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed
                ${isLoading ? 'border-[#D4AF37]/[0.45] shadow-[0_0_24px_rgba(212,175,55,0.15)] animate-pulse' : 'cursor-pointer'}
              `}
            >
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl mb-3"
                style={{
                  backgroundColor: `${demoUser.accent}14`,
                  color: demoUser.accent,
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : Icon ? (
                  <Icon className="w-5 h-5" />
                ) : (
                  <span className="text-xs font-bold">{demoUser.title.charAt(0)}</span>
                )}
              </span>

              <span className="text-xs font-semibold text-white tracking-tight">
                {demoUser.title}
              </span>

              <span className="text-[10px] text-[#7183A6] mt-1 leading-tight px-1">
                {demoUser.description}
              </span>

              <span className="text-[10px] text-[#51617D] mt-2 font-mono truncate w-full px-2">
                {demoUser.email}
              </span>

              <span className="mt-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#D4AF37]/[0.12] text-[#D4AF37] text-[10px] font-semibold tracking-[0.08em] uppercase">
                {isLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Entering...
                  </>
                ) : (
                  'Demo View'
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-center text-[10px] text-[#51617D] mt-4">
        Password for all demo accounts: Cuboid@2026
      </p>
    </div>
  );
}
