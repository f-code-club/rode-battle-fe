import DashboardLayout from '@/components/layout/DashboardLayout';
import { getMockContest } from '@/features/contest/data';
import ProblemsTable from './components/ProblemsTable';

interface ContestLobbyPageProps {
  contestId: string;
}

export default function ContestLobbyPage({ contestId }: ContestLobbyPageProps) {
  const contest = getMockContest(contestId);

  if (!contest) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">Contest not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{contest.title}</h1>
          {contest.subtitle && <p className="mt-1 text-sm text-gray-500">{contest.subtitle}</p>}
        </div>

        <ProblemsTable contestId={contest.id} problems={contest.problems} />
      </div>
    </DashboardLayout>
  );
}
