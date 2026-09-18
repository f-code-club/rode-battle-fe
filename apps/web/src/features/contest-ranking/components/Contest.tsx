import CountdownTimer from '@/features/contest/components/CountdownTimer';
import type { ContestTimerInfo } from '@/features/contest/hooks/useContestTimer';
import type { Contest as ContestType } from '@/features/contest/types';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, Maximize2, Minimize2, Radio, Users } from 'lucide-react';

interface ContestProps {
  contest: ContestType;
  timer: ContestTimerInfo;
  totalTeams?: number;
  totalProblems?: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function Contest({
  contest,
  timer,
  totalTeams = 0,
  totalProblems = 0,
  isFullscreen = false,
  onToggleFullscreen,
}: ContestProps) {
  const date = new Date(contest.start).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const start = new Date(contest.start).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const end = new Date(contest.end).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/contest/$contestId"
          params={{ contestId: contest.id }}
          className="group inline-flex items-center gap-1.5 rounded-lg border border-gray-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-2xs transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to Problemset
        </Link>

        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            title={isFullscreen ? 'Exit presentation mode' : 'Enter presentation mode'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Arena Presentation Mode'}</span>
          </button>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {timer.status === 'running' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 font-bold tracking-wide text-emerald-300 uppercase shadow-xs">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  Live Contest
                </span>
              )}

              {timer.status === 'upcoming' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/20 px-2.5 py-0.5 font-bold tracking-wide text-blue-300 uppercase shadow-xs">
                  <Radio size={12} className="animate-pulse text-blue-300" />
                  Upcoming
                </span>
              )}

              {timer.status === 'ended' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-600 bg-gray-800/80 px-2.5 py-0.5 font-bold tracking-wide text-gray-300 uppercase">
                  Contest Finished
                </span>
              )}

              <span className="text-gray-400">·</span>

              <div className="flex items-center gap-1.5 text-gray-300">
                <Calendar size={13} className="text-gray-400" />
                <span>
                  {date} ({start} – {end})
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">{contest.name}</h1>
              <p className="mt-1 text-xs text-slate-300/80 sm:text-sm">
                Official Live Standings & Scoreboard — Real-Time R.ODE Battle Arena
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 backdrop-blur-xs">
                <Users size={14} className="text-slate-300" />
                <span>
                  <strong className="font-semibold text-white">{totalTeams}</strong> teams registered
                </span>
              </div>
              {totalProblems > 0 && (
                <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 backdrop-blur-xs">
                  <span>
                    Problemset: <strong className="font-semibold text-white">{totalProblems}</strong> challenges
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-slate-950/80 p-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
            <CountdownTimer start={contest.start} end={contest.end} tone="dark" timer={timer} />
          </div>
        </div>
      </div>
    </div>
  );
}
