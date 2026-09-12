import type { ProblemHistoryEntry } from '../types';
import { useProblemHistory } from './useProblemHistory';

export type ProblemSubmittedStatus = 'submitted' | 'not-started' | 'unknown';

export function resolveProblemSubmittedStatus(
  history?: ProblemHistoryEntry[] | null,
  isSuccess = true,
): ProblemSubmittedStatus {
  if (!isSuccess || !history) return 'unknown';
  return history.length > 0 ? 'submitted' : 'not-started';
}

export function useProblemSubmitted(problemId: string): ProblemSubmittedStatus {
  const { data, isSuccess } = useProblemHistory(problemId);
  return resolveProblemSubmittedStatus(data, isSuccess);
}
