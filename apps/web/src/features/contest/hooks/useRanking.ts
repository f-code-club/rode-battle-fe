import { useQuery } from '@tanstack/react-query';
import { contestKeys } from '../queryKeys';
import { contestService } from '../services/contest.service';

export interface UseRankingOptions {
  refetchInterval?: number | false;
  enabled?: boolean;
}

export function useRanking(contestId: string, options?: UseRankingOptions) {
  return useQuery({
    queryKey: contestKeys.rank(contestId),
    queryFn: ({ signal }) => contestService.getRank(contestId, signal),
    enabled: Boolean(contestId) && (options?.enabled ?? true),
    refetchInterval: options?.refetchInterval ?? 30_000,
  });
}
