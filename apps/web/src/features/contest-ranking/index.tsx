import DashboardLayout from '@/components/layout/DashboardLayout';
import { useContest } from '@/features/contest/hooks/useContest';
import { useRanking } from '@/features/contest/hooks/useRanking';
import { problemLabel } from '@/features/contest/utils';
import { useParams } from '@tanstack/react-router';
import Contest from './components/Contest';
import Standings from './components/Standings';

export default function ContestRanking() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const contestId = id ?? '';
  const { data: contest, isLoading, isError, error } = useContest(contestId);
  const { data: rankings = [] } = useRanking(contestId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">Loading...</div>
      </DashboardLayout>
    );
  }

  if (isError || !contest) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">
          {error instanceof Error ? error.message : 'Contest not found.'}
        </div>
      </DashboardLayout>
    );
  }

  const problemLabels = contest.problems.map((_, index) => problemLabel(index));

  return (
    <DashboardLayout>
      <Contest contest={contest} />
      <Standings rankings={rankings} problemLabels={problemLabels} />
    </DashboardLayout>
  );
}
