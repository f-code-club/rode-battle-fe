import { useQuery } from '@tanstack/react-query';
import { problemKeys } from '../queryKeys';
import { problemService } from '../services/problem.service';

export function useProblem(problemId: string) {
  return useQuery({
    queryKey: problemKeys.detail(problemId),
    queryFn: ({ signal }) => problemService.getProblem(problemId, signal),
    enabled: Boolean(problemId),
  });
}
