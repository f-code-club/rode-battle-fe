import { config } from '@/lib/config';
import { apiClient } from '@/lib/http';
import type { ContestDetail, ContestSummary, CreateContestRequest, Ranking } from '../types';

const contestPrefix = config.apiBaseUrl.replace(/\/api\/v1\/?$/, '');

export const contestService = {
  list: (): Promise<ContestSummary[]> => apiClient.get('contests', { prefix: contestPrefix }).json<ContestSummary[]>(),

  detail: (id: string): Promise<ContestDetail> =>
    apiClient.get(`contests/${id}`, { prefix: contestPrefix }).json<ContestDetail>(),

  rank: (id: string): Promise<Ranking[]> =>
    apiClient.get(`contests/${id}/rank`, { prefix: contestPrefix }).json<Ranking[]>(),

  create: (data: CreateContestRequest): Promise<string> =>
    apiClient.post('contests', { prefix: contestPrefix, json: data }).json<string>(),
};
