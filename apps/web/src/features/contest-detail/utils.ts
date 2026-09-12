import type { BackendLanguage, ContestType } from './types';

export function detectContestType(languages: BackendLanguage[]): ContestType {
  return languages.length === 1 && languages[0]?.toLowerCase() === 'html' ? 'FE_CSS_BATTLE' : 'BE_ALGORITHM';
}

export function parseColorCodes(colorCode: string | null): string[] {
  if (!colorCode) return [];
  const codes = colorCode
    .split(',')
    .map((c) => {
      const trimmed = c.trim().toLowerCase();
      return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    })
    .filter((c) => /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(c));
  return Array.from(new Set(codes));
}
