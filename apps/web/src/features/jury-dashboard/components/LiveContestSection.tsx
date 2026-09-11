import { Loader2, Radio } from 'lucide-react';
import type { ContestSummary, Ranking } from '../types';
import { getTimeInfo } from '../utils';

interface LiveContestSectionProps {
  contest: ContestSummary | null;
  rankings: Ranking[];
  problemCount: number;
  loading: boolean;
}

export default function LiveContestSection({ contest, rankings, problemCount, loading }: LiveContestSectionProps) {
  const totalParticipants = rankings.length;
  const totalSubmissions = rankings.reduce((sum, r) => sum + r.details.reduce((s, d) => s + d.submission_count, 0), 0);
  const totalAccepted = rankings.reduce((sum, r) => sum + r.details.filter((d) => d.score > 0).length, 0);
  const totalProblems = rankings.reduce((sum, r) => sum + r.details.length, 0);
  const acRate = totalProblems > 0 ? Math.round((totalAccepted / totalProblems) * 100) : 0;

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

      {!loading && !contest && (
        <div className="px-5 py-12 text-center text-sm text-gray-400">No live contest right now</div>
      )}

      {!loading && contest && (
        <>
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-green-50 px-5 py-2.5 sm:flex-nowrap">
            <div className="inline-flex items-center gap-1.5 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">
              LIVE
            </div>
            <div className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">{contest.name}</div>
            <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-gray-700">
              <span className="text-xs font-medium text-gray-500">ends in</span>{' '}
              {getTimeInfo(contest).replace(' left', '')}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 p-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-md bg-blue-50 p-3.5">
              <div className="mb-2.5 flex h-6 items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">Participants</span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-gray-900">
                {totalParticipants.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-gray-500">from ranking data</div>
            </div>

            <div className="flex flex-col rounded-md bg-orange-50 p-3.5">
              <div className="mb-2.5 flex h-6 items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">Problems</span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-gray-900">{problemCount}</div>
              <div className="mt-1 text-xs text-gray-500">in this contest</div>
            </div>

            <div className="flex flex-col rounded-md bg-amber-50 p-3.5">
              <div className="mb-2.5 flex h-6 items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">Submissions</span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-gray-900">{totalSubmissions.toLocaleString()}</div>
              <div className="mt-1 text-xs text-gray-500">{totalAccepted.toLocaleString()} accepted</div>
            </div>

            <div className="flex flex-col rounded-md bg-green-50 p-3.5">
              <div className="mb-2.5 flex h-6 items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">AC rate</span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-gray-900">{acRate}%</div>
              <div className="mt-1 text-xs text-gray-500">
                {totalAccepted.toLocaleString()} / {totalProblems.toLocaleString()} attempts
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
