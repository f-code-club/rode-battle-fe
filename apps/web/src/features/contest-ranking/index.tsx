import DashboardLayout from '@/components/layout/DashboardLayout';
import { useParams } from '@tanstack/react-router';
import Contest from './components/Contest';
import Standings from './components/Standings';
import { useContest } from './hooks/useContest';
import { useRanking } from './hooks/useRanking';

const PROBLEM_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

export default function ContestRanking() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const contest = useContest(id ?? '');
  const rankings = useRanking(id ?? '');

  if (!contest) return null;

  return (
    <DashboardLayout>
      <Contest contest={contest} />
      <Standings rankings={rankings} problemLabels={PROBLEM_LABELS} />
    </DashboardLayout>
  );
}
