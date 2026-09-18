import ProblemQuickSwitcher from '@/features/contest-detail/components/ProblemQuickSwitcher';
import type { PageColors } from '@/features/contest-detail/templates/CssBattle/config/editorThemes';
import type { ContestTimerInfo } from '@/features/contest/hooks/useContestTimer';
import type { ContestProblemSummary } from '@/features/contest/types';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, History } from 'lucide-react';
import ArenaTimerBadge from './ArenaTimerBadge';

interface ContestHeaderProps {
  title: string;
  subtitle?: string;
  timeRemaining?: string;
  colors?: Pick<PageColors, 'background' | 'foreground' | 'border'>;
  onOpenHistory?: () => void;
  contestId?: string;
  currentProblemId?: string;
  problems?: ContestProblemSummary[];
  contestStart?: string;
  contestEnd?: string;
  timer?: ContestTimerInfo;
}

export default function ContestHeader({
  title,
  subtitle,
  timeRemaining,
  colors = {
    background: '#0d1117',
    foreground: '#f0f6fc',
    border: '#30363d',
  },
  onOpenHistory,
  contestId,
  currentProblemId,
  problems,
  contestStart,
  contestEnd,
  timer,
}: ContestHeaderProps) {
  const borderBottomColor = `color-mix(in srgb, #A9812D 35%, ${colors.background})`;

  return (
    <header
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
        borderBottom: `1px solid ${borderBottomColor}`,
      }}
      className="relative z-30 flex flex-wrap items-center justify-between gap-y-2.5 px-4 py-2.5 sm:px-6"
    >
      <div className="flex items-center gap-3">
        {contestId && (
          <Link
            to="/contest/$contestId"
            params={{ contestId }}
            title="Quay lại danh sách bài thi"
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white active:scale-95"
          >
            <ArrowLeft size={16} />
          </Link>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-tight sm:text-base">{title}</span>
            {subtitle && (!problems || problems.length === 0) && (
              <>
                <span className="hidden h-3.5 w-px sm:block" style={{ backgroundColor: colors.border }} />
                <span className="hidden text-xs font-medium tracking-wider text-amber-400/90 uppercase sm:inline">
                  {subtitle}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {contestId && currentProblemId && problems && problems.length > 0 && (
        <div className="order-3 flex w-full justify-center lg:order-2 lg:w-auto">
          <ProblemQuickSwitcher contestId={contestId} currentProblemId={currentProblemId} problems={problems} />
        </div>
      )}

      <div className="order-2 flex items-center gap-2.5 sm:gap-3 lg:order-3">
        {contestStart && contestEnd ? (
          <ArenaTimerBadge start={contestStart} end={contestEnd} timer={timer} />
        ) : timeRemaining ? (
          <div className="text-right">
            <div className="text-[10px] font-semibold tracking-wider text-white/60 uppercase">Thời gian còn lại</div>
            <div className="font-mono text-xs font-bold text-white sm:text-sm">{timeRemaining}</div>
          </div>
        ) : null}

        {onOpenHistory && (
          <button
            type="button"
            onClick={onOpenHistory}
            title="View submission history"
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-300 active:scale-95"
          >
            <History size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Submissions</span>
          </button>
        )}
      </div>
    </header>
  );
}
