import { useAuthStore } from '@/features/auth';
import type { User, AuthTokens } from '@/features/auth';
import type { DemoUser } from '@/lib/demo-users';

export function performDemoLogin(demoUser: DemoUser): void {
  const store = useAuthStore.getState();

  const user: User = {
    id: demoUser.id,
    email: demoUser.email,
    firstName: 'Demo',
    lastName: demoUser.title,
    role: demoUser.role,
    kycStatus: 'verified',
    onboardingComplete: true,
  };

  const tokens: AuthTokens = {
    accessToken: `demo-access-${Date.now()}`,
    refreshToken: `demo-refresh-${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };

  store.login(user, tokens);
}
