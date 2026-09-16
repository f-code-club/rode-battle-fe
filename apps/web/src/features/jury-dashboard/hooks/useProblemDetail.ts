import { useQuery } from '@tanstack/react-query';
import { juryProblemKeys } from '../queryKeys';
import { problemService } from '../services';

export function useProblemDetail(problemId: string) {
  return useQuery({
    queryKey: juryProblemKeys.detail(problemId),
    queryFn: ({ signal }) => problemService.detail(problemId, signal),
    enabled: Boolean(problemId),
  });
}
