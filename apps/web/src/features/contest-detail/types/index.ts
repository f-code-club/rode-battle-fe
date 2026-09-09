export type BackendLanguage = 'rust' | 'cpp' | 'python' | 'java' | 'html';

export type Verdict =
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'compilation_error'
  | 'memory_limit_exceeded'
  | 'runtime_error'
  | 'idle_time_limit_exceeded';

export interface Problem {
  position: number | null;
  name: string;
  content: string;
  time_limit: number | null;
  memory_limit: number | null;
  color_code: string | null;
  languages: BackendLanguage[];
}

export interface ProblemHistoryEntry {
  id: string;
  language: BackendLanguage;
  code: string;
  verdict: Verdict | null;
  score: number | null;
  created_at: string;
}

export interface SubmitProblemInput {
  language: BackendLanguage;
  code: string;
}

export type ContestType = 'FE_CSS_BATTLE' | 'BE_ALGORITHM';

export interface BeAlgorithmLanguageOption {
  id: Exclude<BackendLanguage, 'html'>;
  label: string;
  fileExt: string;
}

export interface BeAlgorithmMeta {
  timeLimitMs: number | null;
  memoryLimitMb: number | null;
  allowedLanguages: BeAlgorithmLanguageOption[];
}

export interface CssBattleTarget {
  imageUrl: string;
  colorCodes: string[];
}

export interface ContestDetailData {
  id: string;
  title: string;
  type: ContestType;
  statementMarkdown?: string;
  algorithm?: BeAlgorithmMeta;
  target?: CssBattleTarget;
}
