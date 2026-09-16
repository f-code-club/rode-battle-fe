import type { ProblemDetailResponse, ProblemType } from '@/features/jury-dashboard/types';
import { getProblemType } from '@/features/jury-dashboard/utils/problem';

export interface ProblemOption {
  id: string;
  name: string;
  type: ProblemType;
  colorCode?: string | null;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isUuid = (value: string) => UUID_RE.test(value.trim());

export function detailToOption(id: string, detail: ProblemDetailResponse): ProblemOption {
  return {
    id,
    name: detail.name,
    type: getProblemType(detail.languages),
    colorCode: detail.color_code,
  };
}
