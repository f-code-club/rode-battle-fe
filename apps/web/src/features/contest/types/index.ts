export interface ContestProblemSummary {
  id: string;
  position: number;
  name: string;
}

export interface Contest {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface ContestDetail extends Contest {
  problems: ContestProblemSummary[];
}

export interface RankingDetail {
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
  details: RankingDetail[];
}
