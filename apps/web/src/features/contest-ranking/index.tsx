import DashboardLayout from '@/components/layout/DashboardLayout';
import QueryState from '@/components/ui/QueryState';
import { useContest } from '@/features/contest/hooks/useContest';
import { useContestTimer } from '@/features/contest/hooks/useContestTimer';
import { useRanking } from '@/features/contest/hooks/useRanking';
import { problemLabel } from '@/features/contest/utils';
import { toQueryMessage } from '@/lib/http-errors';
import { useParams } from '@tanstack/react-router';
import Contest from './components/Contest';
import Standings from './components/Standings';

export default function ContestRanking() {
  const { contestId } = useParams({ from: '/_authenticated/contest/$contestId/rank' });
  const { data: contest, isLoading, isError, error } = useContest(contestId);
  const timer = useContestTimer(contest?.start, contest?.end);
  const {
    data: rankings = [],
    isError: isRankingError,
    error: rankingError,
  } = useRanking(contestId, { refetchInterval: timer.isEnded ? false : 15_000 });

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

  const problemColumns = contest.problems.map((problem, index) => ({
    position: problem.position,
    label: problemLabel(index),
  }));

  return (
    <DashboardLayout>
      <title>{`${contest.name} — Bảng xếp hạng`}</title>
      <meta name="description" content={`Live standings and leaderboard for ${contest.name}`} />
      <Contest contest={contest} />
      {isRankingError ? (
        <QueryState message={toQueryMessage(rankingError, 'Failed to load ranking.')} size="inline" tone="error" />
      ) : (
        <Standings rankings={rankings} problemColumns={problemColumns} />
      )}
    </DashboardLayout>
  );
}
