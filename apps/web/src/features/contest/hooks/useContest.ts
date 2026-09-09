import { useQuery } from '@tanstack/react-query';
import { contestKeys } from '../queryKeys';
import { contestService } from '../services/contest.service';

export function useContest(contestId: string) {
  return useQuery({
    queryKey: contestKeys.detail(contestId),
    queryFn: ({ signal }) => contestService.getById(contestId, signal),
    enabled: Boolean(contestId),
  });
}
