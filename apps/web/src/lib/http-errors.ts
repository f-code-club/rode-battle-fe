import { HTTPError, NetworkError, TimeoutError } from 'ky';

interface ProblemDetails {
  detail?: string;
  errors?: { name: string; reason: string }[];
}

export function rethrowIfAborted(err: unknown): void {
  if (err instanceof DOMException && err.name === 'AbortError') throw err;
}

export function toFriendlyError(err: unknown, fallback: string): Error {
  rethrowIfAborted(err);
  if (err instanceof HTTPError) {
    const { status } = err.response;
    if (status === 404) return new Error('Not found.', { cause: err });
    if (status === 429) return new Error('Too many attempts. Please try again later.', { cause: err });
    if (status >= 500) return new Error('Server error. Please try again later.', { cause: err });
    if (status === 400 || status === 401 || status === 403) {
      const body = (err.data as ProblemDetails | undefined) ?? {};
      const message = body.detail ?? body.errors?.[0]?.reason ?? fallback;
      return new Error(message, { cause: err });
    }
    return new Error(fallback, { cause: err });
  }
  if (err instanceof TimeoutError) return new Error('Request timed out. Please try again.', { cause: err });
  if (err instanceof NetworkError || err instanceof TypeError) {
    return new Error('Unable to connect to the server. Please check your network.', { cause: err });
  }
  return err instanceof Error ? err : new Error(fallback);
}

export function toQueryMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}
