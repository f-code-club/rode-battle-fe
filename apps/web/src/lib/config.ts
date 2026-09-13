const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api/v1';

function deriveContestsBaseUrl(url: string): string {
  const suffixPattern = /\/api\/v1\/?$/;
  if (!suffixPattern.test(url)) {
    console.warn(
      `[config] VITE_API_BASE_URL ("${url}") doesn't end in /api/v1 — contestsBaseUrl will fall back to it unchanged, which likely breaks the /contests routing workaround.`,
    );
    return url;
  }
  return url.replace(suffixPattern, '') || '/';
}

export const config = {
  apiBaseUrl,
  contestsBaseUrl: deriveContestsBaseUrl(apiBaseUrl),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
