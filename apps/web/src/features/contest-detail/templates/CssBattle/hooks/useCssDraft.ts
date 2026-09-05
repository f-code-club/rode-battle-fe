import { useLocalStorage } from 'usehooks-ts';

export interface CssDraft {
  code: string;
}

export function useCssDraft(contestId: string, problemId: string, defaults: CssDraft) {
  const [stored, setStored] = useLocalStorage<CssDraft>(`contest-problem-draft-${contestId}-${problemId}`, defaults);
  const draft = typeof stored?.code === 'string' ? stored : defaults;
  return [draft, setStored] as const;
}
