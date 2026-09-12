import DashboardLayout from '@/components/layout/DashboardLayout';
import QueryState from '@/components/ui/QueryState';
import CountdownTimer from '@/features/contest/components/CountdownTimer';
import { useContest } from '@/features/contest/hooks/useContest';
import { toQueryMessage } from '@/lib/http-errors';
import { Link, useParams } from '@tanstack/react-router';
import { Trophy } from 'lucide-react';
import ProblemsTable from './components/ProblemsTable';

interface ContestLobbyPageProps {
  contestId?: string;
}

export default function ContestLobbyPage({ contestId: propContestId }: ContestLobbyPageProps = {}) {
  const params = useParams({ strict: false }) as { contestId?: string };
  const contestId = propContestId ?? params.contestId ?? '';
  const { data: contest, isLoading, isError, error } = useContest(contestId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <QueryState message="Loading..." />
      </DashboardLayout>
    );
  }

  if (isError || !contest) {
    return (
      <DashboardLayout>
        <QueryState message={toQueryMessage(error, 'Contest not found.')} tone="error" />
      </DashboardLayout>
    );
  }

  const date = new Date(contest.start).toLocaleDateString('vi-VN');
  const start = new Date(contest.start).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const end = new Date(contest.end).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <DashboardLayout>
      <title>{`${contest.name} — Contest Lobby`}</title>
      <meta name="description" content={`Contest lobby and problems for ${contest.name}`} />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{contest.name}</h1>
            <p className="text-sm text-gray-500">
              {date}, {start} – {end}
            </p>
            <div className="mt-2">
              <Link
                to="/contest/$contestId/rank"
                params={{ contestId: contest.id }}
                className="inline-flex items-center gap-1.5 rounded-sm border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 hover:text-gray-900"
              >
                <Trophy size={14} className="text-amber-500" />
                Bảng xếp hạng (Standings)
              </Link>
            </div>
          </div>

          <CountdownTimer start={contest.start} end={contest.end} />
        </div>
        <ProblemsTable contestId={contest.id} problems={contest.problems} />
      </div>
    </DashboardLayout>
  );
}
