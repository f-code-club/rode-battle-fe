import { Link } from '@tanstack/react-router';
import { ArrowRight, Loader2, Radio } from 'lucide-react';
import type { ContestSummary } from '../types';
import { getTimeInfo } from '../utils';

const MAX_VISIBLE = 3;

interface LiveContestSectionProps {
  liveContests: ContestSummary[];
  loading: boolean;
}

export default function LiveContestSection({ liveContests, loading }: LiveContestSectionProps) {
  const visible = liveContests.slice(0, MAX_VISIBLE);
  const hasMore = liveContests.length > MAX_VISIBLE;

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <div className="flex items-center border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <Radio size={18} className="text-red-600" />
          <h3 className="text-base font-bold text-gray-900">Live Contest</h3>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={20} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && liveContests.length === 0 && (
        <div className="px-5 py-12 text-center text-sm text-gray-400">No live contest right now</div>
      )}

      {!loading && liveContests.length > 0 && (
        <div className="divide-y divide-gray-100">
          {visible.map((contest) => (
            <Link
              key={contest.id}
              to="/jury/contests/$contestId"
              params={{ contestId: contest.id }}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50"
            >
              <div className="inline-flex items-center gap-1.5 rounded bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-800">
                LIVE
              </div>
              <div className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">{contest.name}</div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-500">
                <span>{getTimeInfo(contest).replace(' left', '')} left</span>
              </div>
            </Link>
          ))}

          {hasMore && (
            <div className="px-5 py-3">
              <Link
                to="/jury/contests"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 transition-colors hover:text-emerald-700"
              >
                View all live contests <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
