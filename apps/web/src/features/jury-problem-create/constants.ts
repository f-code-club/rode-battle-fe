import type { ProblemLanguage, ProblemType } from '@/features/jury-dashboard/types';

export type AlgoLanguage = Exclude<ProblemLanguage, 'html'>;

export const ALGO_LANGUAGES: { id: AlgoLanguage; label: string; ext: string }[] = [
  { id: 'cpp', label: 'C++', ext: 'cpp' },
  { id: 'python', label: 'Python', ext: 'py' },
  { id: 'java', label: 'Java', ext: 'java' },
  { id: 'rust', label: 'Rust', ext: 'rs' },
];

export const LANGUAGE_LABELS: Record<ProblemLanguage, string> = {
  cpp: 'C++',
  python: 'Python',
  java: 'Java',
  rust: 'Rust',
  html: 'HTML/CSS',
};

export const COLOR_PRESETS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#64748b'];

export const DEFAULT_COLOR: Record<ProblemType, string> = {
  CSS_BATTLE: '#3b82f6',
  ALGORITHM: '#10b981',
};

export const CSS_TARGET_ASPECT = 4 / 3;
export const CSS_TARGET_RECOMMENDED = { width: 400, height: 300 };
export const CSS_TARGET_MAX_BYTES = 5 * 1024 * 1024;

export const inputClass =
  'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500';

export const labelClass = 'mb-1.5 block text-xs font-semibold text-gray-700';
