import { problemService } from '@/features/jury-dashboard/services';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { detailToOption, isUuid, type ProblemOption } from '../utils/problemSearch';

interface UseProblemSearchResult {
  results: ProblemOption[];
  isSearching: boolean;
  error: string | null;
}

interface Lookup {
  id: string;
  option: ProblemOption | null;
  error: string | null;
}

export function useProblemSearch(query: string): UseProblemSearchResult {
  const trimmed = query.trim().toLowerCase();
  const [debounced] = useDebounceValue(trimmed, 250);
  const [lookup, setLookup] = useState<Lookup | null>(null);

  useEffect(() => {
    if (!isUuid(debounced)) return;

    let cancelled = false;
    problemService
      .detail(debounced)
      .then((detail) => {
        if (!cancelled) setLookup({ id: debounced, option: detailToOption(debounced, detail), error: null });
      })
      .catch(() => {
        if (!cancelled) setLookup({ id: debounced, option: null, error: 'No problem found with this UUID' });
      });

    return () => {
      cancelled = true;
    };
  }, [debounced]);

  if (!isUuid(trimmed)) return { results: [], isSearching: false, error: null };

  const resolved = lookup?.id === trimmed ? lookup : null;
  return {
    results: resolved?.option ? [resolved.option] : [],
    isSearching: resolved === null,
    error: resolved?.error ?? null,
  };
}
