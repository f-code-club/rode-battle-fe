import { useProblemHistory } from './useProblemHistory';

export type ProblemSubmittedStatus = 'submitted' | 'not-started' | 'unknown';

export function useProblemSubmitted(problemId: string): ProblemSubmittedStatus {
  const { data, isSuccess } = useProblemHistory(problemId);
  if (!isSuccess) return 'unknown';
  return data.length > 0 ? 'submitted' : 'not-started';
}
