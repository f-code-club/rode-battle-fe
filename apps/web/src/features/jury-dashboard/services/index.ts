import { config } from '@/lib/config';
import { apiClient } from '@/lib/http';
import type {
  ContestDetail,
  ContestSummary,
  CreateContestRequest,
  CreateProblemRequest,
  ProblemDetailResponse,
  ProblemListItem,
} from '../types';

const contestPrefix = config.apiBaseUrl.replace(/\/api\/v1\/?$/, '');

export const contestService = {
  list: (signal?: AbortSignal): Promise<ContestSummary[]> =>
    apiClient.get('contests', { prefix: contestPrefix, signal }).json<ContestSummary[]>(),

  detail: (contestId: string, signal?: AbortSignal): Promise<ContestDetail> =>
    apiClient.get(`contests/${contestId}`, { prefix: contestPrefix, signal }).json<ContestDetail>(),

  create: (data: CreateContestRequest): Promise<string> =>
    apiClient.post('contests', { prefix: contestPrefix, json: data }).json<string>(),
};

export const problemService = {
  list: (signal?: AbortSignal): Promise<ProblemListItem[]> =>
    apiClient.get('problems', { signal }).json<ProblemListItem[]>(),

  detail: (problemId: string, signal?: AbortSignal): Promise<ProblemDetailResponse> =>
    apiClient.get(`problems/${problemId}`, { signal }).json<ProblemDetailResponse>(),

  create: async (data: CreateProblemRequest): Promise<string> => {
    const raw = await apiClient.post('problems', { json: data }).text();
    return raw.replace(/["\r\n]/g, '').trim();
  },
};
