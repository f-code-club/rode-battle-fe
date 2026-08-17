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
