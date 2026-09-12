import { apiClient } from '@/lib/http';
import { toFriendlyError } from '@/lib/http-errors';
import type { Problem, ProblemHistoryEntry, SubmitProblemInput } from '../types';

export const problemService = {
  getProblem: async (problemId: string, signal?: AbortSignal): Promise<Problem> => {
    try {
      return await apiClient.get(`problems/${problemId}`, { signal }).json<Problem>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to load problem.');
    }
  },

  getHistory: async (problemId: string, signal?: AbortSignal): Promise<ProblemHistoryEntry[]> => {
    try {
      return await apiClient.get(`problems/${problemId}/history`, { signal }).json<ProblemHistoryEntry[]>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to load submission history.');
    }
  },

  submit: async (problemId: string, input: SubmitProblemInput): Promise<string> => {
    try {
      return await apiClient.post(`problems/${problemId}/submit`, { json: input }).json<string>();
    } catch (err) {
      throw toFriendlyError(err, 'Failed to submit solution.');
    }
  },
};
