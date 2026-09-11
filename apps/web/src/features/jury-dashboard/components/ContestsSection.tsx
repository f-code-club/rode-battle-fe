import { Loader2, Trophy } from 'lucide-react';
import type { ContestSummary } from '../types';
import { getStatusBadge, getTimeInfo } from '../utils';

interface ContestRowProps {
  title: string;
  badge: string;
  timeInfo: string;
}

const ContestRow = ({ title, badge, timeInfo }: ContestRowProps) => {
  return (
    <div className="flex cursor-pointer items-start gap-3.5 p-4 transition-colors hover:bg-gray-50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
        <Trophy size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-gray-900">{title}</h4>
        <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gray-500">
          {badge === 'LIVE' && (
            <span className="flex items-center gap-1 rounded bg-black px-1.5 py-0.5 text-xs font-bold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              LIVE
            </span>
          )}
          <span>{timeInfo}</span>
        </div>
      </div>
    </div>
  );
};

interface ContestsSectionProps {
  contests: ContestSummary[];
  loading: boolean;
}

export default function ContestsSection({ contests, loading }: ContestsSectionProps) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
        <Trophy size={16} className="text-gray-700" />
        <h3 className="text-sm font-bold text-gray-900">Contests</h3>
        <span className="ml-auto text-xs text-gray-400">{contests.length} total</span>
      </div>
      <div className="divide-y divide-gray-100">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-gray-400" />
          </div>
        )}
        {!loading && contests.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-gray-400">No contests found</div>
        )}
        {!loading &&
          contests.map((contest) => (
            <ContestRow
              key={contest.id}
              title={contest.name}
              badge={getStatusBadge(contest)}
              timeInfo={getTimeInfo(contest)}
            />
          ))}
      </div>
    </div>
  );
}
