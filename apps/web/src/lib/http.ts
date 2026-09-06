import ky, { HTTPError } from 'ky';
import { config } from './config';

let currentAccessToken: string | null = null;
let refreshAccessToken: (() => Promise<string | null>) | null = null;
let onAuthRefreshFailed: (() => void) | null = null;
let onAuthTokenRefreshed: ((token: string) => void) | null = null;
let pendingRefresh: Promise<string | null> | null = null;

export function setHttpAccessToken(token: string | null) {
  currentAccessToken = token;
}

export function configureHttpAuthRefresh(fn: () => Promise<string | null>) {
  refreshAccessToken = fn;
}

export function configureHttpAuthRefreshFailed(fn: () => void) {
  onAuthRefreshFailed = fn;
}

export function configureHttpAuthTokenRefreshed(fn: (token: string) => void) {
  onAuthTokenRefreshed = fn;
}

function refreshAccessTokenOnce(): Promise<string | null> {
  if (!pendingRefresh) {
    pendingRefresh = refreshAccessToken!().finally(() => {
      pendingRefresh = null;
    });
  }
  return pendingRefresh;
}

export const apiClient = ky.create({
  prefix: config.apiBaseUrl,
  credentials: 'include',
  timeout: 10_000,
  retry: {
    limit: 1,
    methods: ['get', 'post', 'put', 'patch', 'delete', 'head'],
    delay: () => 0,
    shouldRetry: async ({ error }) => {
      if (!(error instanceof HTTPError) || error.response.status !== 401 || !refreshAccessToken) {
        return false;
      }
      const isAuthEndpoint = new URL(error.request.url).pathname.includes('/auth/');
      if (isAuthEndpoint) return false;
      const newToken = await refreshAccessTokenOnce();
      if (!newToken) {
        onAuthRefreshFailed?.();
        return false;
      }
      setHttpAccessToken(newToken);
      onAuthTokenRefreshed?.(newToken);
      return true;
    },
  },
  headers: { Accept: '*/*' },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        if (currentAccessToken && !request.headers.has('Authorization')) {
          request.headers.set('Authorization', `Bearer ${currentAccessToken}`);
        }
      },
    ],
    beforeRetry: [
      ({ request }) => {
        if (currentAccessToken) {
          request.headers.set('Authorization', `Bearer ${currentAccessToken}`);
        }
      },
    ],
  },
});
