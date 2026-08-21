import { lazy, Suspense } from 'react';
import type { ContestDetailData } from './types';

const FeCssBattleTemplate = lazy(() => import('./templates/FeCssBattle'));
const BeAlgorithmTemplate = lazy(() => import('./templates/BeAlgorithm'));

interface ContestDetailProps {
  contestId: string;
  problemId: string;
  data?: ContestDetailData;
}

export default function ContestDetail({ contestId, problemId, data }: ContestDetailProps) {
  const Template = data?.type === 'BE_ALGORITHM' ? BeAlgorithmTemplate : FeCssBattleTemplate;
  return (
    <Suspense fallback={null}>
      <Template contestId={contestId} problemId={problemId} contestData={data} />
    </Suspense>
  );
}
