import { useEffect, useMemo, useState } from 'react';
import { contestService } from '../services';
import type { ContestSummary } from '../types';
import { isLive } from '../utils';

export function useContests() {
  const [contests, setContests] = useState<ContestSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    contestService
      .list()
      .then(setContests)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { contests, loading, error };
}

export function useLiveContest(contests: ContestSummary[]) {
  const liveContest = useMemo(() => contests.find((c) => isLive(c)) ?? null, [contests]);

  return liveContest;
}
