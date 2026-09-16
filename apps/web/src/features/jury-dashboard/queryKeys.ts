export const juryContestKeys = {
  all: ['jury', 'contests'] as const,
  list: () => [...juryContestKeys.all, 'list'] as const,
  detail: (contestId: string) => [...juryContestKeys.all, 'detail', contestId] as const,
};

export const juryProblemKeys = {
  all: ['jury', 'problems'] as const,
  detail: (problemId: string) => [...juryProblemKeys.all, 'detail', problemId] as const,
};
