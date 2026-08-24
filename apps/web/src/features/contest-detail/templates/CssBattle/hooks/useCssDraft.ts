import { useLocalStorage } from 'usehooks-ts';

export interface CssDraft {
  html: string;
  css: string;
}

export function useCssDraft(contestId: string, problemId: string, defaults: CssDraft) {
  return useLocalStorage<CssDraft>(`contest-problem-draft-${contestId}-${problemId}`, defaults);
}
