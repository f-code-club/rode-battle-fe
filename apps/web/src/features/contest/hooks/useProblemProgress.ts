import { useLocalStorage } from 'usehooks-ts';
import type { ProblemStatus } from '../types';

export interface ProblemProgress {
  html: string;
  css: string;
  submitted: boolean;
}

export function useProblemProgress(problemId: string, defaults: { html: string; css: string }) {
  return useLocalStorage<ProblemProgress>(`contest-problem-${problemId}`, {
    html: defaults.html,
    css: defaults.css,
    submitted: false,
  });
}

export function deriveProblemStatus(progress: ProblemProgress, defaults: { html: string; css: string }): ProblemStatus {
  if (progress.submitted) return 'submitted';
  if (progress.html !== defaults.html || progress.css !== defaults.css) return 'in-progress';
  return 'not-started';
}
