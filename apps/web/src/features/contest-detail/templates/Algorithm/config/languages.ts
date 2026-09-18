import type { BackendLanguage, BeAlgorithmLanguageOption } from '../../../types';

export const ALGORITHM_LANGUAGE_OPTIONS: Record<BeAlgorithmLanguageOption['id'], BeAlgorithmLanguageOption> = {
  cpp: { id: 'cpp', label: 'C/C++', fileExt: '.cpp' },
  python: { id: 'python', label: 'Python', fileExt: '.py' },
  java: { id: 'java', label: 'Java', fileExt: '.java' },
  rust: { id: 'rust', label: 'Rust', fileExt: '.rs' },
};

export const DEFAULT_ALGORITHM_LANGUAGES: BeAlgorithmLanguageOption[] = [
  ALGORITHM_LANGUAGE_OPTIONS.cpp,
  ALGORITHM_LANGUAGE_OPTIONS.python,
  ALGORITHM_LANGUAGE_OPTIONS.java,
  ALGORITHM_LANGUAGE_OPTIONS.rust,
];

export function getAlgorithmLanguageOption(language: BackendLanguage): BeAlgorithmLanguageOption | undefined {
  return ALGORITHM_LANGUAGE_OPTIONS[language as BeAlgorithmLanguageOption['id']];
}
