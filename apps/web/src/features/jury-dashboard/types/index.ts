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

export interface RankDetail {
  problem_id: string;
  problem_position: number;
  submission_count: number;
  score: number;
  last_submit: string;
}

export interface Ranking {
  name: string;
  score: number;
  penalty: number;
  details: RankDetail[];
}

export interface CreateContestRequest {
  name: string;
  start: string;
  end: string;
  problems: string[];
}
