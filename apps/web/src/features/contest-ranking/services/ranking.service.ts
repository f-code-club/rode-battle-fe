import { config } from '@/lib/config';
import { apiClient } from '@/lib/http';
import type { Contest, Ranking } from '../types';

const contestPrefix = config.apiBaseUrl.replace(/\/api\/v1\/?$/, '');

export const rankService = {
  getContest: (contestId: string): Promise<Contest> =>
    apiClient.get(`contests/${contestId}`, { prefix: contestPrefix }).json<Contest>(),

  getRank: (contestId: string): Promise<Ranking[]> =>
    apiClient.get(`contests/${contestId}/rank`, { prefix: contestPrefix }).json<Ranking[]>(),
};
