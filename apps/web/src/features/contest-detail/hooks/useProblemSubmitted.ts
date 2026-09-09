import { useProblemHistory } from './useProblemHistory';

export function useProblemSubmitted(problemId: string) {
  const { data } = useProblemHistory(problemId);
  return Boolean(data && data.length > 0);
}
