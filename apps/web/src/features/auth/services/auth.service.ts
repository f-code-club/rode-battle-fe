import { apiClient, configureHttpAuthRefresh } from '@/lib/http';
import { HTTPError, TimeoutError } from 'ky';
import type { LoginFormValues } from '../schemas/auth.schema';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
}

export type MeResult =
  { user: AuthUser; reason?: never } | { user: null; reason: 'unauthenticated' | 'server_error' | 'network_error' };

interface ProblemDetails {
  detail?: string;
  errors?: { name: string; reason: string }[];
}

function rethrowIfAborted(err: unknown): void {
  if (err instanceof DOMException && err.name === 'AbortError') throw err;
}

export const authService = {
  login: async (data: LoginFormValues, signal?: AbortSignal): Promise<string> => {
    try {
      return await apiClient.post('auth/login', { json: data, signal }).text();
    } catch (err) {
      rethrowIfAborted(err);
      if (err instanceof HTTPError) {
        const { status } = err.response;
        if (status === 429) throw new Error('Too many attempts. Please try again later.', { cause: err });
        if (status >= 500) throw new Error('Server error. Please try again later.', { cause: err });
        if (status === 400 || status === 401) {
          const body = (err.data as ProblemDetails | undefined) ?? {};
          const message = body.detail ?? body.errors?.[0]?.reason ?? 'Invalid request. Please check your input.';
          throw new Error(message, { cause: err });
        }
        throw new Error('Something went wrong. Please try again.', { cause: err });
      }
      if (err instanceof TimeoutError) throw new Error('Request timed out. Please try again.', { cause: err });
      if (err instanceof TypeError) {
        throw new Error('Unable to connect to the server. Please check your network.', { cause: err });
      }
      throw err;
    }
  },

  refresh: async (signal?: AbortSignal): Promise<string | null> => {
    try {
      return await apiClient.get('auth/refresh', { signal }).text();
    } catch (err) {
      rethrowIfAborted(err);
      return null;
    }
  },

  me: async (accessToken: string, signal?: AbortSignal): Promise<MeResult> => {
    try {
      const user = await apiClient
        .get('auth/me', { headers: { Authorization: `Bearer ${accessToken}` }, signal })
        .json<AuthUser>();
      return { user };
    } catch (err) {
      rethrowIfAborted(err);
      if (err instanceof HTTPError) {
        if (err.response.status === 401 || err.response.status === 403) {
          return { user: null, reason: 'unauthenticated' };
        }
        return { user: null, reason: 'server_error' };
      }
      if (err instanceof TimeoutError || err instanceof TypeError) {
        return { user: null, reason: 'network_error' };
      }
      return { user: null, reason: 'server_error' };
    }
  },

  logout: async (): Promise<void> => {
    await apiClient.get('auth/logout').catch(() => {});
  },
};

configureHttpAuthRefresh(() => authService.refresh());
