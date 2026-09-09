import { useQuery } from '@tanstack/react-query';
import { contestKeys } from '../queryKeys';
import { contestService } from '../services/contest.service';

export function useRanking(contestId: string) {
  return useQuery({
    queryKey: contestKeys.rank(contestId),
    queryFn: ({ signal }) => contestService.getRank(contestId, signal),
    enabled: Boolean(contestId),
  });
}
