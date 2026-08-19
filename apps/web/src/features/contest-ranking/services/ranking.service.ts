import type { Contest, Ranking } from '../types';

const BASE_URL = '/api';

export const rankService = {
  getContest: async (contestId: string): Promise<Contest> => {
    const res = await fetch(`${BASE_URL}/contest/${contestId}`);
    if (!res.ok) throw new Error(`Failed to fetch contest ${contestId}`);
    return res.json();
  },

  getRank: async (contestId: string): Promise<Ranking[]> => {
    const res = await fetch(`${BASE_URL}/contest/${contestId}/rank`);
    if (!res.ok) throw new Error(`Failed to fetch rank for contest ${contestId}`);
    return res.json();
  },
};
