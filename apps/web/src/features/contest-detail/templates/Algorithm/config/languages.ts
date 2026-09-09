import type { BeAlgorithmLanguageOption } from '../../../types';

export const ALGORITHM_LANGUAGE_OPTIONS: Record<BeAlgorithmLanguageOption['id'], BeAlgorithmLanguageOption> = {
  rust: { id: 'rust', label: 'Rust', fileExt: '.rs' },
  cpp: { id: 'cpp', label: 'C/C++', fileExt: '.cpp' },
  python: { id: 'python', label: 'Python 3', fileExt: '.py' },
  java: { id: 'java', label: 'Java', fileExt: '.java' },
};
