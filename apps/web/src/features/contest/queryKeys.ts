export const contestKeys = {
  all: ['contests'] as const,
  list: () => [...contestKeys.all, 'list'] as const,
  detail: (contestId: string) => [...contestKeys.all, 'detail', contestId] as const,
  rank: (contestId: string) => [...contestKeys.all, 'rank', contestId] as const,
};
