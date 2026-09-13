import { useMutation, useQueryClient } from '@tanstack/react-query';
import { problemKeys } from '../queryKeys';
import { problemService } from '../services/problem.service';
import type { SubmitProblemInput } from '../types';

export function useSubmitProblem(problemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitProblemInput) => problemService.submit(problemId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: problemKeys.history(problemId) });
    },
  });
}
