import { useQuery } from '@tanstack/react-query';
import { contestKeys } from '../queryKeys';
import { contestService } from '../services/contest.service';

export function useContests() {
  return useQuery({
    queryKey: contestKeys.list(),
    queryFn: ({ signal }) => contestService.list(signal),
  });
}
