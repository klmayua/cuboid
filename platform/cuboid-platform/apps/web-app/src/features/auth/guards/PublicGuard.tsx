import { type ReactNode } from 'react';
import { useAuthStore, selectIsAuthenticated } from '../store';

interface PublicGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function PublicGuard({ children, fallback }: PublicGuardProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (isAuthenticated) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
