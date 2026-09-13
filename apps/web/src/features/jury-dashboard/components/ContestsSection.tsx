import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { ContestSummary } from '../types';
import { getStatusBadge, getTimeInfo, sortContestsByPriority } from '../utils';

const MAX_VISIBLE = 6;

const BADGE_CLASS: Record<ReturnType<typeof getStatusBadge>, string> = {
  LIVE: 'bg-emerald-100 text-emerald-700',
  UPCOMING: 'bg-blue-100 text-blue-700',
  ENDED: 'bg-gray-100 text-gray-500',
};

function ContestRow({ contest }: { contest: ContestSummary }) {
  const badge = getStatusBadge(contest);

  return (
    <Link
      to="/jury/contests/$contestId"
      params={{ contestId: contest.id }}
      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50"
    >
      <span
        className={cn(
          'flex w-20 shrink-0 items-center justify-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-bold',
          BADGE_CLASS[badge],
        )}
      >
        {badge === 'LIVE' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
        {badge}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">{contest.name}</span>
      <span className="shrink-0 text-xs text-gray-500">{getTimeInfo(contest)}</span>
    </Link>
  );
}

interface ContestsSectionProps {
  contests: ContestSummary[];
  loading: boolean;
}

export default function ContestsSection({ contests, loading }: ContestsSectionProps) {
  const visible = sortContestsByPriority(contests).slice(0, MAX_VISIBLE);

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900">Contests</h3>
        <Link
          to="/jury/contests"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 transition-colors hover:text-gray-900"
        >
          View all {contests.length > 0 && `(${contests.length})`} <ArrowRight size={13} />
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={20} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && contests.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-gray-400">No contests yet</div>
      )}

      {!loading && visible.length > 0 && (
        <div className="divide-y divide-gray-100">
          {visible.map((contest) => (
            <ContestRow key={contest.id} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
}
