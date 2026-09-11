import { useEffect, useMemo, useState } from 'react';
import { contestService } from '../services';
import type { ContestDetail, ContestSummary, Ranking } from '../types';
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

export function useContestRank(contestId: string | null) {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [fetchedId, setFetchedId] = useState<string | null>(null);

  useEffect(() => {
    if (!contestId) return;

    contestService
      .rank(contestId)
      .then((data) => {
        setRankings(data);
        setFetchedId(contestId);
      })
      .catch(() => {
        setRankings([]);
        setFetchedId(contestId);
      });
  }, [contestId]);

  return {
    rankings: contestId ? rankings : [],
    loading: Boolean(contestId && contestId !== fetchedId),
  };
}

export function useContestDetail(contestId: string | null) {
  const [detail, setDetail] = useState<ContestDetail | null>(null);
  const [fetchedId, setFetchedId] = useState<string | null>(null);

  useEffect(() => {
    if (!contestId) return;

    contestService
      .detail(contestId)
      .then((data) => {
        setDetail(data);
        setFetchedId(contestId);
      })
      .catch(() => {
        setDetail(null);
        setFetchedId(contestId);
      });
  }, [contestId]);

  return {
    detail: contestId ? detail : null,
    loading: Boolean(contestId && contestId !== fetchedId),
  };
}
