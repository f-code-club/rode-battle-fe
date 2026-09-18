import DashboardLayout from '@/components/layout/DashboardLayout';
import QueryState from '@/components/ui/QueryState';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { isStaffRole } from '@/features/auth/utils';
import { useContest } from '@/features/contest/hooks/useContest';
import { useContestTimer } from '@/features/contest/hooks/useContestTimer';
import { useRanking } from '@/features/contest/hooks/useRanking';
import { problemLabel } from '@/features/contest/utils';
import { toQueryMessage } from '@/lib/http-errors';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Contest from './components/Contest';
import Standings from './components/Standings';

export default function ContestRanking() {
  const { contestId } = useParams({ from: '/_authenticated/contest/$contestId/rank' });
  const { data: contest, isLoading, isError, error } = useContest(contestId);
  const timer = useContestTimer(contest?.start, contest?.end);
  const { user } = useAuthContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isStaff = isStaffRole(user?.role);

  const {
    data: rankings = [],
    isError: isRankingError,
    error: rankingError,
  } = useRanking(contestId, {
    refetchInterval: !isStaff || timer.isEnded ? false : 30_000,
    enabled: isStaff,
  });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()?.catch(() => {});
    } else {
      document.exitFullscreen?.()?.catch(() => {});
    }
  };

  if (!isStaff) {
    return (
      <DashboardLayout>
        <QueryState
          message="Bảng xếp hạng trực tiếp chỉ dành cho Ban giám khảo (Jury) và Quản trị viên (Admin)."
          tone="error"
        />
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <QueryState message="Loading live standings..." />
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

  const content = (
    <div className={isFullscreen ? 'min-h-screen bg-slate-950 p-4 text-white sm:p-8' : ''}>
      <title>{`${contest.name} — Bảng xếp hạng trực tiếp`}</title>
      <meta name="description" content={`Live standings and scoreboard for ${contest.name}`} />

      <Contest
        contest={contest}
        timer={timer}
        totalTeams={rankings.length}
        totalProblems={problemColumns.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {isRankingError ? (
        <QueryState message={toQueryMessage(rankingError, 'Failed to load ranking.')} size="inline" tone="error" />
      ) : (
        <Standings rankings={rankings} problemColumns={problemColumns} currentTeam={user?.name} />
      )}
    </div>
  );

  if (isFullscreen) {
    return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">{content}</div>;
  }

  return <DashboardLayout>{content}</DashboardLayout>;
}
