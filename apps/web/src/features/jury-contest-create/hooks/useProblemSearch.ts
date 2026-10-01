import { juryProblemKeys } from '@/features/jury-dashboard/queryKeys';
import { problemService } from '@/features/jury-dashboard/services';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { detailToOption, isUuid, type ProblemOption } from '../utils/problemSearch';

interface UseProblemSearchResult {
  results: ProblemOption[];
  isSearching: boolean;
  error: string | null;
}

const EMPTY: UseProblemSearchResult = { results: [], isSearching: false, error: null };
const LOADING: UseProblemSearchResult = { results: [], isSearching: true, error: null };

export function useProblemSearch(query: string): UseProblemSearchResult {
  const trimmed = query.trim();
  const [debouncedQuery] = useDebounceValue(trimmed, 300);
  const isStable = debouncedQuery === trimmed;
  const uuidQuery = isUuid(debouncedQuery) ? debouncedQuery.toLowerCase() : null;

  const {
    data: problemList,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: juryProblemKeys.list(),
    queryFn: ({ signal }) => problemService.list(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const {
    data: detailData,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useQuery({
    queryKey: juryProblemKeys.detail(debouncedQuery),
    queryFn: ({ signal }) => problemService.detail(debouncedQuery, signal),
    enabled: !!uuidQuery && isStable,
    retry: false,
  });

  const results = useMemo((): ProblemOption[] => {
    if (!isStable || !debouncedQuery) return [];

    const matched: ProblemOption[] = [];

    if (uuidQuery && detailData) {
      matched.push(detailToOption(uuidQuery, detailData));
    }

    if (problemList?.length) {
      const ranked = problemList
        .map((item) => ({ item, ranking: rankItem(item.name, debouncedQuery) }))
        .filter(({ ranking }) => ranking.passed)
        .sort((a, b) => (b.ranking.rank ?? 0) - (a.ranking.rank ?? 0));

      for (const { item } of ranked) {
        if (!matched.some((m) => m.id === item.id)) {
          matched.push({ id: item.id, name: item.name, type: 'ALGORITHM' });
        }
      }
    }

    return matched;
  }, [isStable, debouncedQuery, uuidQuery, detailData, problemList]);

  if (!trimmed) return EMPTY;
  if (!isStable || (isListLoading && !uuidQuery)) return LOADING;

  const waitingForDetail = !!uuidQuery && isDetailPending;
  const noResults = results.length === 0 && !waitingForDetail;
  return {
    results,
    isSearching: waitingForDetail,
    error: noResults
      ? isListError
        ? 'Failed to load problems'
        : uuidQuery && isDetailError
          ? 'No problem found with this UUID'
          : 'No problems found'
      : null,
  };
}
