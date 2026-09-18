import type { ContestTimerInfo } from '@/features/contest/hooks/useContestTimer';
import type { Contest as ContestType } from '@/features/contest/types';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

interface ContestProps {
  contest: ContestType;
  timer: ContestTimerInfo;
}

export default function Contest({ contest, timer }: ContestProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <Link
        to="/contest/$contestId"
        params={{ contestId: contest.id }}
        className="group inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back to Problemset
      </Link>

      <div className="flex items-center gap-2">
        {timer.isRunning && (
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        )}
        <span className="text-xs font-medium text-gray-500">
          {timer.isEnded ? 'Đã kết thúc' : timer.isUpcoming ? 'Bắt đầu sau:' : 'Thời gian còn lại:'}
        </span>
        <span className="font-mono text-sm font-bold text-gray-900 tabular-nums sm:text-base">
          {timer.isEnded ? '00:00:00' : timer.formattedRemaining}
        </span>
      </div>
    </div>
  );
}
