import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole =
  | 'PUBLIC'
  | 'USER'
  | 'BROKER'
  | 'BDC_OPERATOR'
  | 'TREASURY'
  | 'COMPLIANCE'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'REGULATOR'
  | 'MANAGER'
  | 'ANALYST'
  | 'PARTNER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  orgId?: string;
  avatarUrl?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  onboardingComplete: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (tokens) => set({ tokens }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      login: (user, tokens) => set({ user, tokens, isAuthenticated: true, error: null }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false, error: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'cuboid-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUser = (state: AuthState) => state.user;
export const selectUserRole = (state: AuthState) => state.user?.role ?? 'PUBLIC';
export const selectIsOnboardingComplete = (state: AuthState) =>
  state.user?.onboardingComplete ?? false;
