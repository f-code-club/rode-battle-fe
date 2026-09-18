import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useRanking } from '@/features/contest/hooks/useRanking';
import type { ContestProblemSummary } from '@/features/contest/types';
import { problemLabel, sortByPosition } from '@/features/contest/utils';
import { cn } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface ProblemQuickSwitcherProps {
  contestId: string;
  currentProblemId: string;
  problems?: ContestProblemSummary[];
  className?: string;
  variant?: 'dark' | 'light';
}

export default function ProblemQuickSwitcher({
  contestId,
  currentProblemId,
  problems = [],
  className,
  variant = 'dark',
}: ProblemQuickSwitcherProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data: rankings = [] } = useRanking(contestId, { refetchInterval: 20_000 });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const sortedProblems = useMemo(() => sortByPosition(problems), [problems]);

  const currentIndex = sortedProblems.findIndex((p) => p.id === currentProblemId);
  const currentProblem = currentIndex >= 0 ? sortedProblems[currentIndex] : null;
  const currentLabel = currentIndex >= 0 ? problemLabel(currentIndex) : '';
  const prevProblem = currentIndex > 0 ? sortedProblems[currentIndex - 1] : null;
  const nextProblem =
    currentIndex >= 0 && currentIndex < sortedProblems.length - 1 ? sortedProblems[currentIndex + 1] : null;
  const myRanking = useMemo(() => {
    if (!user?.name) return null;
    return rankings.find((r) => r.name.toLowerCase() === user.name.toLowerCase());
  }, [rankings, user]);

  const problemStatusMap = useMemo(() => {
    const map = new Map<string, { isSolved: boolean; isAttempted: boolean; score: number }>();
    if (!myRanking?.details) return map;

    for (const detail of myRanking.details) {
      const isSolved = detail.score > 0;
      const isAttempted = detail.submission_count > 0 && !isSolved;
      map.set(detail.problem_id, {
        isSolved,
        isAttempted,
        score: detail.score,
      });
    }
    return map;
  }, [myRanking]);

  const handleNavigate = useCallback(
    (targetProblemId: string) => {
      if (targetProblemId === currentProblemId) return;
      void navigate({
        to: '/contest/$contestId/problem/$problemId',
        params: { contestId, problemId: targetProblemId },
      });
    },
    [currentProblemId, navigate, contestId],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.altKey && e.key === '[') {
        if (prevProblem) {
          e.preventDefault();
          handleNavigate(prevProblem.id);
        }
      } else if (e.altKey && e.key === ']') {
        if (nextProblem) {
          e.preventDefault();
          handleNavigate(nextProblem.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProblem, nextProblem, handleNavigate]);

  if (sortedProblems.length === 0) return null;

  return (
    <div ref={containerRef} className={cn('relative inline-flex items-center select-none', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-xl p-1 transition-all duration-200',
          variant === 'light'
            ? 'border border-gray-200/90 bg-white shadow-2xs'
            : 'border border-white/20 bg-[#161b26]/95 shadow-md ring-1 shadow-black/50 ring-white/10 backdrop-blur-xl hover:border-amber-400/40',
        )}
      >
        <button
          type="button"
          disabled={!prevProblem}
          onClick={() => prevProblem && handleNavigate(prevProblem.id)}
          aria-label="Previous problem"
          title={prevProblem ? `Previous: Problem ${prevProblem.name} (Alt + [)` : undefined}
          className={cn(
            'group relative flex size-8 items-center justify-center rounded-lg transition-all duration-150',
            prevProblem
              ? variant === 'light'
                ? 'cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:scale-95'
                : 'cursor-pointer text-slate-200 hover:bg-white/15 hover:text-white active:scale-95'
              : variant === 'light'
                ? 'cursor-not-allowed text-gray-300'
                : 'cursor-not-allowed text-white/25',
          )}
        >
          <ChevronLeft size={16} />
          {prevProblem && (
            <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-md bg-slate-900/95 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-white/90 opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity group-hover:opacity-100">
              Alt + [
            </span>
          )}
        </button>

        <span className={cn('h-4 w-px shrink-0', variant === 'light' ? 'bg-gray-200' : 'bg-white/15')} />

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex h-8 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-xs font-semibold transition-all duration-150',
            variant === 'light'
              ? 'text-gray-800 hover:bg-gray-100/80 active:scale-[0.98]'
              : 'text-slate-100 hover:bg-white/12 hover:text-white active:scale-[0.98]',
            isOpen &&
              (variant === 'light'
                ? 'bg-gray-100 text-gray-900'
                : 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/40'),
          )}
        >
          <span className={cn('font-mono font-bold', variant === 'light' ? 'text-gray-500' : 'text-slate-400')}>
            {currentLabel}.
          </span>

          <span
            className={cn(
              'max-w-35 truncate font-semibold sm:max-w-55',
              variant === 'light' ? 'text-gray-900' : 'text-slate-100',
            )}
          >
            {currentProblem?.name ?? 'Select problem'}
          </span>

          <span
            className={cn(
              'font-mono text-[11px] font-normal',
              variant === 'light' ? 'text-gray-400' : 'text-slate-400',
            )}
          >
            ({currentIndex >= 0 ? currentIndex + 1 : 0}/{sortedProblems.length})
          </span>

          <ChevronDown
            size={13}
            className={cn(
              'shrink-0 transition-transform duration-200',
              isOpen
                ? variant === 'light'
                  ? 'rotate-180 text-emerald-600'
                  : 'rotate-180 text-amber-400'
                : variant === 'light'
                  ? 'text-gray-400'
                  : 'text-slate-400',
            )}
          />
        </button>

        <span className={cn('h-4 w-px shrink-0', variant === 'light' ? 'bg-gray-200' : 'bg-white/15')} />

        <button
          type="button"
          disabled={!nextProblem}
          onClick={() => nextProblem && handleNavigate(nextProblem.id)}
          aria-label="Next problem"
          title={nextProblem ? `Next: Problem ${nextProblem.name} (Alt + ])` : undefined}
          className={cn(
            'group relative flex size-8 items-center justify-center rounded-lg transition-all duration-150',
            nextProblem
              ? variant === 'light'
                ? 'cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:scale-95'
                : 'cursor-pointer text-slate-200 hover:bg-white/15 hover:text-white active:scale-95'
              : variant === 'light'
                ? 'cursor-not-allowed text-gray-300'
                : 'cursor-not-allowed text-white/25',
          )}
        >
          <ChevronRight size={16} />
          {nextProblem && (
            <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-md bg-slate-900/95 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-white/90 opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity group-hover:opacity-100">
              Alt + ]
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border p-1.5 shadow-2xl transition-all duration-150 sm:w-80',
            variant === 'light'
              ? 'border-gray-200 bg-white text-gray-800'
              : 'border-white/20 bg-[#161c28] text-white shadow-2xl ring-1 shadow-black/80 ring-white/10 backdrop-blur-2xl',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between border-b px-3.5 py-2 text-[10px] font-bold tracking-wider uppercase',
              variant === 'light' ? 'border-gray-100 text-gray-400' : 'border-white/10 bg-white/4 text-slate-300',
            )}
          >
            <span>Problems ({sortedProblems.length})</span>
            <span>Status</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1">
            {sortedProblems.map((prob, idx) => {
              const isCurrent = prob.id === currentProblemId;
              const status = problemStatusMap.get(prob.id);
              const label = problemLabel(idx);

              return (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleNavigate(prob.id);
                  }}
                  className={cn(
                    'group/item flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-xs transition-all duration-150',
                    isCurrent
                      ? variant === 'light'
                        ? 'bg-emerald-50 font-bold text-emerald-950 ring-1 ring-emerald-500/20'
                        : 'bg-linear-to-r from-amber-500/20 via-amber-500/10 to-transparent font-bold text-amber-200 shadow-xs ring-1 ring-amber-400/40'
                      : variant === 'light'
                        ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        : 'text-slate-200 hover:translate-x-0.5 hover:bg-white/12 hover:text-white',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold transition-transform group-hover/item:scale-105',
                        status?.isSolved
                          ? 'bg-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                          : status?.isAttempted
                            ? 'bg-amber-500 text-white shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                            : isCurrent
                              ? variant === 'light'
                                ? 'bg-gray-900 text-white'
                                : 'bg-amber-400 font-bold text-slate-950 shadow-xs'
                              : variant === 'light'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-slate-700 text-slate-200 ring-1 ring-white/15',
                      )}
                    >
                      {label}
                    </span>
                    <span
                      className={cn(
                        'truncate font-medium',
                        isCurrent && (variant === 'dark' ? 'text-amber-100' : 'text-emerald-950'),
                      )}
                    >
                      {prob.name}
                    </span>
                  </div>

                  <div className="shrink-0">
                    {status?.isSolved ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 size={13} />
                        <span>Solved</span>
                      </span>
                    ) : status?.isAttempted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400">
                        <Clock size={13} />
                        <span>Attempted</span>
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'font-mono text-[11px]',
                          variant === 'light' ? 'text-gray-400' : 'text-slate-500',
                        )}
                      >
                        —
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              'flex items-center justify-between border-t px-3 py-1.5 text-xs',
              variant === 'light' ? 'border-gray-100 text-gray-400' : 'border-white/10 bg-white/2 text-slate-400',
            )}
          >
            <span>Phím tắt: Alt + [ / Alt + ]</span>
            <span>Esc để đóng</span>
          </div>
        </div>
      )}
    </div>
  );
}
