import { lazy, Suspense } from 'react';
import type { ContestDetailData } from './types';

const CssBattleTemplate = lazy(() => import('./templates/CssBattle'));
const AlgorithmTemplate = lazy(() => import('./templates/Algorithm'));

interface ContestDetailProps {
  contestId: string;
  problemId: string;
  data?: ContestDetailData;
}

export default function ContestDetail({ contestId, problemId, data }: ContestDetailProps) {
  const Template = data?.type === 'BE_ALGORITHM' ? AlgorithmTemplate : CssBattleTemplate;
  return (
    <Suspense fallback={null}>
      <Template contestId={contestId} problemId={problemId} contestData={data} />
    </Suspense>
  );
}
