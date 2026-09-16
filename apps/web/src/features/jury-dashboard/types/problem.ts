export type ProblemLanguage = 'rust' | 'cpp' | 'python' | 'java' | 'html';

export type ProblemType = 'CSS_BATTLE' | 'ALGORITHM';

export interface CreateProblemRequest {
  name: string;
  content: string;
  languages: ProblemLanguage[];
  checker_language?: ProblemLanguage | null;
  checker_code?: string | null;
  time_limit?: number | null;
  memory_limit?: number | null;
  color_code?: string | null;
}

export interface ProblemDetailResponse {
  position: number | null;
  name: string;
  content: string;
  time_limit: number | null;
  memory_limit: number | null;
  color_code: string | null;
  languages: ProblemLanguage[];
}
