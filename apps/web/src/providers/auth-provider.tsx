'use client';

import { clearAuthTokens, initializeSession, saveAuthTokens } from '@/lib/auth/session';
import type { AuthTokens } from '@/types/auth';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (tokens: AuthTokens) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    setStatus(initializeSession() ? 'authenticated' : 'unauthenticated');
  }, []);

  const signIn = useCallback((tokens: AuthTokens) => {
    saveAuthTokens(tokens);
    setStatus('authenticated');
  }, []);

  const signOut = useCallback(() => {
    clearAuthTokens();
    setStatus('unauthenticated');
  }, []);

  const value = useMemo(
    () => ({
      status,
      isAuthenticated: status === 'authenticated',
      isLoading: status === 'loading',
      signIn,
      signOut,
    }),
    [status, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useOptionalAuth() {
  return useContext(AuthContext);
}
