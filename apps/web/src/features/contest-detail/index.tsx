import FeCssBattleTemplate from './templates/FeCssBattle';
import type { ContestDetailData } from './types';

interface ContestDetailProps {
  contestId: string;
  problemId: string;
  data?: ContestDetailData;
}

export default function ContestDetail({ contestId, problemId, data }: ContestDetailProps) {
  return <FeCssBattleTemplate contestId={contestId} problemId={problemId} contestData={data} />;
}
