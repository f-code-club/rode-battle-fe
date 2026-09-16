import type { ProblemLanguage, ProblemType } from '../types';

export const LANGUAGE_LABELS: Record<ProblemLanguage, string> = {
  cpp: 'C++',
  python: 'Python',
  java: 'Java',
  rust: 'Rust',
  html: 'HTML/CSS',
};

export const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  CSS_BATTLE: 'CSS Battle',
  ALGORITHM: 'Algorithm',
};

export function getProblemType(languages: ProblemLanguage[]): ProblemType {
  return languages.includes('html') ? 'CSS_BATTLE' : 'ALGORITHM';
}
