export interface Problem {
  id: string;
  position: number;
}

export interface Contest {
  id: string;
  name: string;
  start: string;
  end: string;
  problems: Problem[];
}

export interface Result {
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
  details: Result[];
}
