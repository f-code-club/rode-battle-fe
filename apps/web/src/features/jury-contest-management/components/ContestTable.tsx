import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, Loader2, SearchX } from 'lucide-react';
import type { ContestSummary } from '../types';
import { computeDurationInfo, getStatusBadge, getTimeInfo } from '../utils';

interface ContestTableProps {
  contests: ContestSummary[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function ContestTable({
  contests,
  loading,
  page,
  totalPages,
  totalItems,
  onPageChange,
}: ContestTableProps) {
  const formatDateTime = (isoString: string) => {
    const d = dayjs(isoString);
    if (!d.isValid()) return '—';
    return d.format('DD/MM/YYYY HH:mm');
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600">
          <thead className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Contest
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5">
                Start Time
              </th>
              <th scope="col" className="px-4 py-3.5">
                End Time
              </th>
              <th scope="col" className="px-4 py-3.5">
                Duration
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 size={22} className="animate-spin text-emerald-600" />
                    <span className="text-xs text-gray-400">Loading contests...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && contests.length === 0 && (
              <tr>
                <td colSpan={6} className="py-14 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <SearchX size={18} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">No contests found</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              contests.map((contest) => {
                const badge = getStatusBadge(contest);
                const timeInfo = getTimeInfo(contest);
                const duration = computeDurationInfo(contest.start, contest.end);

                return (
                  <tr key={contest.id} className="transition-colors hover:bg-gray-50/60">
                    <td className="px-5 py-4">
                      <Link
                        to="/jury/contests/$contestId"
                        params={{ contestId: contest.id }}
                        className="block max-w-xs truncate font-semibold text-gray-900 transition-colors hover:text-emerald-700 sm:max-w-md"
                      >
                        {contest.name}
                      </Link>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        {badge === 'LIVE' && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                            Live
                          </span>
                        )}
                        {badge === 'UPCOMING' && (
                          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                            Upcoming
                          </span>
                        )}
                        {badge === 'ENDED' && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                            Ended
                          </span>
                        )}
                        {badge !== 'ENDED' && <span className="text-[11px] text-gray-500">{timeInfo}</span>}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-800">
                        <Calendar size={13} className="text-gray-400" />
                        <span>{formatDateTime(contest.start)}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-800">
                        <Calendar size={13} className="text-gray-400" />
                        <span>{formatDateTime(contest.end)}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock size={13} className="text-gray-400" />
                        <span>{duration.text || '—'}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <Link
                        to="/jury/contests/$contestId"
                        params={{ contestId: contest.id }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 transition-colors hover:text-emerald-700"
                      >
                        <span>Manage</span>
                        <ArrowRight size={13} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {!loading && totalItems > 0 && (
        <div className="flex items-center justify-end border-t border-gray-200 px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <span className="px-2 text-xs font-medium text-gray-600">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
