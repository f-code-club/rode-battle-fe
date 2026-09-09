import DashboardLayout from '@/components/layout/DashboardLayout';
import { useContest } from '@/features/contest/hooks/useContest';
import ProblemsTable from './components/ProblemsTable';

interface ContestLobbyPageProps {
  contestId: string;
}

export default function ContestLobbyPage({ contestId }: ContestLobbyPageProps) {
  const { data: contest, isLoading, isError, error } = useContest(contestId);

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

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{contest.name}</h1>
        </div>

        <ProblemsTable contestId={contest.id} problems={contest.problems} />
      </div>
    </DashboardLayout>
  );
}
