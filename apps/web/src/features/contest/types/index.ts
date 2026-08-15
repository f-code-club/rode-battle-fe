import type { ContestType } from '@/features/contest-detail/types';

export type ProblemStatus = 'not-started' | 'in-progress' | 'submitted';

export interface ContestProblemSummary {
  id: string;
  title: string;
  type: ContestType;
}

export interface Contest {
  id: string;
  title: string;
  subtitle?: string;
  problems: ContestProblemSummary[];
}
