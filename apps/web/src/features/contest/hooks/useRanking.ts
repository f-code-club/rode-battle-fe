import { useQuery } from '@tanstack/react-query';
import { contestKeys } from '../queryKeys';
import { contestService } from '../services/contest.service';

export interface UseRankingOptions {
  refetchInterval?: number | false;
}

export function useRanking(contestId: string, options?: UseRankingOptions) {
  return useQuery({
    queryKey: contestKeys.rank(contestId),
    queryFn: ({ signal }) => contestService.getRank(contestId, signal),
    enabled: Boolean(contestId),
    refetchInterval: options?.refetchInterval ?? 15_000,
  });
}
