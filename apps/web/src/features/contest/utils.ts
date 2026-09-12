const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function problemLabel(index: number): string {
  return index < ALPHABET.length ? ALPHABET.charAt(index) : `P${index + 1}`;
}

export function sortByPosition<T extends { position?: number | null }>(items: T[]): T[] {
  return items.slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}
