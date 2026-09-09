import { useQuery } from '@tanstack/react-query';
import { problemKeys } from '../queryKeys';
import { problemService } from '../services/problem.service';

export function useProblemHistory(problemId: string) {
  return useQuery({
    queryKey: problemKeys.history(problemId),
    queryFn: ({ signal }) => problemService.getHistory(problemId, signal),
    enabled: Boolean(problemId),
  });
}
