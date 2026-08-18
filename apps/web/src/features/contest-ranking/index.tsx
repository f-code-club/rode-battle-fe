import DashboardLayout from '@/components/layout/DashboardLayout';
import { useParams } from '@tanstack/react-router';
import Contest from './components/Contest';
import Standings from './components/Standings';
import { useRanking } from './hooks/useRanking';
import type { Contest as ContestType } from './types';

const INITIAL_CONTEST: ContestType = {
  id: '',
  name: 'Contest Standings',
  start: new Date().toISOString(),
  end: new Date().toISOString(),
  problems: [],
};

const PROBLEM_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

export default function ContestRanking() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const rankings = useRanking(id ?? '');

  return (
    <DashboardLayout>
      <Contest contest={INITIAL_CONTEST} />
      <Standings rankings={rankings} problemLabels={PROBLEM_LABELS} />
    </DashboardLayout>
  );
}
