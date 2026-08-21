export type ContestType = 'FE_CSS_BATTLE' | 'BE_ALGORITHM';

export interface ColorPaletteItem {
  name?: string;
  hex: string;
}

export interface CssBattleTarget {
  id: string;
  title: string;
  width: number;
  height: number;
  targetImageUrl?: string;
  colors: ColorPaletteItem[];
  sponsor?: {
    name: string;
    description: string;
    logoUrl?: string;
  };
}

export interface BeAlgorithmLanguageOption {
  id: string;
  label: string;
  fileExt: string;
}

export interface BeAlgorithmMeta {
  statementMarkdown: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  points?: number;
  allowedLanguages: BeAlgorithmLanguageOption[];
}

export interface ContestDetailData {
  id: string;
  title: string;
  type: ContestType;
  initialHtml?: string;
  initialCss?: string;
  target?: CssBattleTarget;
  algorithm?: BeAlgorithmMeta;
}
