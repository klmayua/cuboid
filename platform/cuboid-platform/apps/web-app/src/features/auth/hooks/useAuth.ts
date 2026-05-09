import { useCallback } from 'react';
import { useAuthStore } from '../store';

export function useAuth() {
  const { user, tokens, isAuthenticated, isLoading, error, login, logout, setLoading, setError } =
    useAuthStore();

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message ?? 'Sign in failed');
        login(data.user, data.tokens);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading, setError]
  );

  const signUp = useCallback(
    async (input: { email: string; password: string; firstName: string; lastName: string }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message ?? 'Sign up failed');
        login(data.user, data.tokens);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading, setError]
  );

  const signOut = useCallback(() => {
    logout();
    // Optionally call API to revoke session
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }, [logout]);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };
}
