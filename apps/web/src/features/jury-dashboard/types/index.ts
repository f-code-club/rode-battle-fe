export interface ContestSummary {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface ContestProblem {
  id: string;
  position: number;
  name: string;
}

export interface ContestDetail {
  id: string;
  name: string;
  start: string;
  end: string;
  problems: ContestProblem[];
}

export interface CreateContestRequest {
  name: string;
  start: string;
  end: string;
  problems: string[];
}

export * from './problem';
