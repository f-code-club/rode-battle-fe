import { useEffect, useState } from 'react';
import { rankService } from '../services/ranking.service';
import type { Contest } from '../types';

export const useContest = (contestId: string) => {
  const [contest, setContest] = useState<Contest | null>(null);

  useEffect(() => {
    rankService.getContest(contestId).then((data) => setContest(data));
  }, [contestId]);

  return contest;
};
