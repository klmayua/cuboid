'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Building2, Landmark, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import { DEMO_USERS } from '@/lib/demo-users';
import { performDemoLogin } from '@/lib/auth/demo-login';
import type { DemoUser } from '@/lib/demo-users';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Briefcase,
  Building2,
  Landmark,
  Wallet,
  ShieldCheck,
};

const DEMO_TIMEOUT_MS = 1500;

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
      if (loadingRole) return;
      setLoadingRole(demoUser.id);

      // Safety timeout: auto-clear loading if redirect never fires
      timeoutRef.current = setTimeout(() => {
        setLoadingRole(null);
      }, DEMO_TIMEOUT_MS);

      try {
        performDemoLogin(demoUser);
        router.push(demoUser.redirectTo);
      } catch {
        clearSafeguard();
        setLoadingRole(null);
      }
    },
    [loadingRole, router, clearSafeguard]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, demoUser: DemoUser) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDemoLogin(demoUser);
      }
    },
    [handleDemoLogin]
  );

  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
          Demo Access
        </h2>
        <p className="text-xs text-[#7183A6] mt-1">
          Preview operational workspaces instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DEMO_USERS.map((demoUser) => {
          const Icon = iconMap[demoUser.icon];
          const isLoading = loadingRole === demoUser.id;

          return (
            <div
              key={demoUser.id}
              role="button"
              tabIndex={0}
              aria-label={`Demo sign in as ${demoUser.title}`}
              onClick={() => handleDemoLogin(demoUser)}
              onKeyDown={(e) => handleKeyDown(e, demoUser)}
              className={`
                relative flex flex-col items-center text-center
                p-4 rounded-[18px] cursor-pointer
                min-h-[220px] overflow-hidden
                bg-[#0A0E1E]/[0.92] backdrop-blur-md
                border border-[#D4AF37]/[0.18]
                transition-all duration-200 ease-out
                hover:border-[#D4AF37]/[0.45]
                hover:-translate-y-[2px]
                hover:shadow-[0_4px_24px_rgba(212,175,55,0.08)]
                focus:outline-none focus:ring-2 focus:ring-[#5E8DFF]/30 focus:ring-offset-2 focus:ring-offset-[#05070D]
                ${isLoading ? 'opacity-70 pointer-events-none' : ''}
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
                ) : null}
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

              <span className="mt-auto inline-block px-2 py-0.5 rounded-[6px] bg-[#D4AF37]/[0.12] text-[#D4AF37] text-[10px] font-semibold tracking-[0.08em] uppercase">
                {isLoading ? 'Entering...' : 'Demo View'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
