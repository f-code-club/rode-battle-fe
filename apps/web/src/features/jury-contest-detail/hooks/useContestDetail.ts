import { contestService } from '@/features/jury-dashboard/services';
import type { ContestDetail } from '@/features/jury-dashboard/types';
import { useCallback, useEffect, useState } from 'react';

export function useContestDetail(contestId: string) {
  const [contest, setContest] = useState<ContestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(() => {
    if (!contestId) return;
    contestService
      .detail(contestId)
      .then(setContest)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [contestId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { contest, loading, error };
}
