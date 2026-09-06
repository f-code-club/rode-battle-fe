import { configureHttpAuthRefreshFailed, configureHttpAuthTokenRefreshed, setHttpAccessToken } from '@/lib/http';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authService, type AuthUser } from '../services/auth.service';

export interface AuthContextValue {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  completeLogin: (accessToken: string) => Promise<void>;
  user: AuthUser | null;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    if (!token) setUser(null);
  }, []);

  const completeLogin = useCallback(
    async (token: string) => {
      const result = await authService.me(token);
      if (result.reason) {
        setAccessToken(null);
        const message =
          result.reason === 'unauthenticated'
            ? 'Session expired. Please sign in again.'
            : result.reason === 'network_error'
              ? 'Unable to connect to the server. Please check your network.'
              : 'Something went wrong while loading your profile. Please try again.';
        throw new Error(message);
      }
      setAccessTokenState(token);
      setUser(result.user);
    },
    [setAccessToken],
  );

  useEffect(() => {
    setHttpAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    configureHttpAuthRefreshFailed(() => setAccessToken(null));
  }, [setAccessToken]);

  useEffect(() => {
    configureHttpAuthTokenRefreshed((token) => setAccessTokenState(token));
  }, []);

  useEffect(() => {
    authService
      .refresh()
      .then((token) => (token ? completeLogin(token) : undefined))
      .catch(() => undefined)
      .finally(() => setIsAuthReady(true));
  }, [completeLogin]);

  const value = useMemo(
    () => ({ accessToken, setAccessToken, completeLogin, user, isAuthReady }),
    [accessToken, setAccessToken, completeLogin, user, isAuthReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
