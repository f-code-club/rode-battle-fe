export const problemKeys = {
  all: ['problems'] as const,
  detail: (problemId: string) => [...problemKeys.all, 'detail', problemId] as const,
  history: (problemId: string) => [...problemKeys.all, 'history', problemId] as const,
};
