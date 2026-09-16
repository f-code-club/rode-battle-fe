import { useQuery } from '@tanstack/react-query';
import { juryContestKeys } from '../queryKeys';
import { contestService } from '../services';

export function useContests() {
  return useQuery({
    queryKey: juryContestKeys.list(),
    queryFn: ({ signal }) => contestService.list(signal),
  });
}
