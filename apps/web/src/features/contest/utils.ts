const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function problemLabel(index: number): string {
  return index < ALPHABET.length ? ALPHABET.charAt(index) : `P${index + 1}`;
}
