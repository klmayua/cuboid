import { type ReactNode } from 'react';
import { useAuthStore, selectUserRole, selectIsOnboardingComplete } from '../store';
import type { UserRole } from '../store';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const role = useAuthStore(selectUserRole);

  if (!allowedRoles.includes(role)) {
    return fallback ?? null;
  }

  return <>{children}</>;
}

interface OnboardingGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function OnboardingGuard({ children, fallback }: OnboardingGuardProps) {
  const isOnboardingComplete = useAuthStore(selectIsOnboardingComplete);

  if (!isOnboardingComplete) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
