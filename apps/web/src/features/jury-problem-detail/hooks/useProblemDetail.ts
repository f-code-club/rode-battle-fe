import { problemService } from '@/features/jury-dashboard/services';
import type { ProblemDetailResponse } from '@/features/jury-dashboard/types';
import { useCallback, useEffect, useState } from 'react';

export function useProblemDetail(id: string | null) {
  const [data, setData] = useState<ProblemDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      void Promise.resolve().then(() => {
        if (isMounted) {
          setData(null);
          setError(null);
          setIsLoading(false);
        }
      });
      return () => {
        isMounted = false;
      };
    }

    void Promise.resolve().then(() => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }
    });

    problemService
      .detail(id)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Failed to load problem details');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const refetch = useCallback(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    problemService
      .detail(id)
      .then(setData)
      .catch(() => setError('Failed to load problem details'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
