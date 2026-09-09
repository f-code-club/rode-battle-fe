import type { BackendLanguage, ContestType } from './types';

export function detectContestType(languages: BackendLanguage[]): ContestType {
  return languages.length === 1 && languages[0] === 'html' ? 'FE_CSS_BATTLE' : 'BE_ALGORITHM';
}

export function parseColorCodes(colorCode: string | null): string[] {
  if (!colorCode) return [];
  return colorCode
    .split(',')
    .map((c) => c.trim())
    .filter((c) => /^#[0-9a-f]{6}$/i.test(c));
}
