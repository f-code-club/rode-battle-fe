import { getMockProblemDetail } from '@/features/contest/data';
import { useParams } from '@tanstack/react-router';
import ContestDetail from '.';

export default function ContestProblemPage() {
  const { contestId, problemId } = useParams({ from: '/contest/$contestId/problem/$problemId' });
  const data = getMockProblemDetail(problemId);
  return <ContestDetail contestId={contestId} problemId={problemId} data={data} />;
}
