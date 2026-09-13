import { juryProblemKeys } from '@/features/jury-dashboard/queryKeys';
import { problemService } from '@/features/jury-dashboard/services';
import { useQuery } from '@tanstack/react-query';
import { useDebounceValue } from 'usehooks-ts';
import { detailToOption, isUuid, type ProblemOption } from '../utils/problemSearch';

interface UseProblemSearchResult {
  results: ProblemOption[];
  isSearching: boolean;
  error: string | null;
}

export function useProblemSearch(query: string): UseProblemSearchResult {
  const trimmed = query.trim().toLowerCase();
  const [problemId] = useDebounceValue(trimmed, 250);
  const enabled = isUuid(problemId) && problemId === trimmed;

  const { data, isPending, isError } = useQuery({
    queryKey: juryProblemKeys.detail(problemId),
    queryFn: ({ signal }) => problemService.detail(problemId, signal),
    enabled,
    retry: false,
  });

  if (!isUuid(trimmed)) return { results: [], isSearching: false, error: null };

  return {
    results: enabled && data ? [detailToOption(problemId, data)] : [],
    isSearching: !enabled || isPending,
    error: enabled && isError ? 'No problem found with this UUID' : null,
  };
}
