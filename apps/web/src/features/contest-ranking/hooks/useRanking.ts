import { useEffect, useState } from 'react';
import { rankService } from '../services/ranking.service';
import type { Ranking } from '../types';

export const useRanking = (contestId: string) => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    rankService.getRank(contestId).then((data) => setRankings(data));
  }, [contestId]);

  return rankings;
};
