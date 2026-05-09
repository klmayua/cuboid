import { type ReactNode } from 'react';
import { useAuthStore, selectIsAuthenticated } from '../store';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
