import type { ContestDetail } from '@/features/jury-dashboard/types';
import dayjs from 'dayjs';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

function getContestStatus(contest: ContestDetail): 'live' | 'upcoming' | 'ended' {
  const now = Date.now();
  const start = new Date(contest.start).getTime();
  const end = new Date(contest.end).getTime();
  if (now >= start && now <= end) return 'live';
  if (now < start) return 'upcoming';
  return 'ended';
}

function formatDuration(startStr: string, endStr: string): string {
  const diffMin = Math.floor((new Date(endStr).getTime() - new Date(startStr).getTime()) / 60000);
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  return parts.join(' ') || '0m';
}

const statusConfig = {
  live: {
    label: 'Live',
    dot: true,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  upcoming: {
    label: 'Upcoming',
    dot: false,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  ended: {
    label: 'Ended',
    dot: false,
    className: 'bg-gray-100 text-gray-600 border-gray-200',
  },
};

interface ContestInfoCardProps {
  contest: ContestDetail;
}

export default function ContestInfoCard({ contest }: ContestInfoCardProps) {
  const status = getContestStatus(contest);
  const cfg = statusConfig[status];
  const duration = formatDuration(contest.start, contest.end);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">{contest.name}</h2>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cfg.className}`}
            >
              {cfg.dot && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
              {cfg.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-400" />
              <span>{dayjs(contest.start).format('DD/MM/YYYY HH:mm')}</span>
              <span className="text-gray-300">→</span>
              <span>{dayjs(contest.end).format('DD/MM/YYYY HH:mm')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-400" />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        <a
          href={`/contest/${contest.id}/rank`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          Standings
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
