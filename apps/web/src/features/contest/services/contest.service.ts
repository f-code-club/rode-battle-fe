import { contestsApiClient } from '@/lib/http';
import { toFriendlyError } from '@/lib/http-errors';
import type { Contest, ContestDetail, Ranking } from '../types';

export const contestService = {
  list: async (signal?: AbortSignal): Promise<Contest[]> => {
    try {
      return await contestsApiClient.get('contests', { signal }).json<Contest[]>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to load contests.');
    }
  },

  getById: async (contestId: string, signal?: AbortSignal): Promise<ContestDetail> => {
    try {
      return await contestsApiClient.get(`contests/${contestId}`, { signal }).json<ContestDetail>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to load contest.');
    }
  },

  getRank: async (contestId: string, signal?: AbortSignal): Promise<Ranking[]> => {
    try {
      return await contestsApiClient.get(`contests/${contestId}/rank`, { signal }).json<Ranking[]>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to load ranking.');
    }
  },
};
