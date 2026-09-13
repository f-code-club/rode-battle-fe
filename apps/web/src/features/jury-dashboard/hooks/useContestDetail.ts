import { useQuery } from '@tanstack/react-query';
import { juryContestKeys } from '../queryKeys';
import { contestService } from '../services';

export function useContestDetail(contestId: string) {
  return useQuery({
    queryKey: juryContestKeys.detail(contestId),
    queryFn: ({ signal }) => contestService.detail(contestId, signal),
    enabled: Boolean(contestId),
  });
}
