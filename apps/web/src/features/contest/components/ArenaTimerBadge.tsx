import { type ContestTimerInfo, useContestTimer } from '@/features/contest/hooks/useContestTimer';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, Flame } from 'lucide-react';
import { useMemo } from 'react';
import styles from './ArenaTimerBadge.module.css';

interface ArenaTimerBadgeProps {
  start?: string;
  end?: string;
  timer?: ContestTimerInfo;
  className?: string;
}

export default function ArenaTimerBadge({ start, end, timer: externalTimer, className }: ArenaTimerBadgeProps) {
  const internalTimer = useContestTimer(externalTimer ? undefined : start, externalTimer ? undefined : end);
  const timer = externalTimer ?? internalTimer;

  const remainingPercent = useMemo(() => {
    if (!timer.isRunning || timer.durationSeconds <= 0) {
      return 100;
    }
    return Math.min(100, Math.max(0, (timer.remainingSeconds / timer.durationSeconds) * 100));
  }, [timer.isRunning, timer.durationSeconds, timer.remainingSeconds]);

  const timerStage = useMemo<'green' | 'yellow' | 'red'>(() => {
    if (!timer.isRunning) return 'green';
    if (timer.durationSeconds > 0) {
      if (remainingPercent <= 20) return 'red';
      if (remainingPercent <= 50) return 'yellow';
      return 'green';
    }
    if (timer.remainingSeconds <= 300) return 'red';
    if (timer.remainingSeconds <= 900) return 'yellow';
    return 'green';
  }, [timer.isRunning, timer.durationSeconds, timer.remainingSeconds, remainingPercent]);

  const badgeThemeClass = timer.isEnded
    ? styles.ended
    : timer.isUpcoming
      ? styles.upcoming
      : timerStage === 'red'
        ? styles.red
        : timerStage === 'yellow'
          ? styles.yellow
          : styles.green;

  return (
    <div className={cn(styles.badge, badgeThemeClass, className)}>
      <div className={styles.content}>
        {timerStage === 'red' ? (
          <Flame size={14} className="animate-bounce text-white" />
        ) : timerStage === 'yellow' ? (
          <AlertTriangle size={14} className="text-white" />
        ) : (
          <Clock size={14} className="text-white" />
        )}

        <span className="hidden text-[10px] font-bold tracking-wider uppercase opacity-90 sm:inline">
          {timer.isEnded
            ? 'Ended'
            : timer.isUpcoming
              ? 'Upcoming'
              : timerStage === 'red'
                ? 'Final minutes'
                : timerStage === 'yellow'
                  ? 'Time crunch'
                  : 'Time left'}
        </span>

        <span className="font-mono text-xs font-bold tracking-wider">
          {timer.isRunning
            ? timer.formattedRemaining
            : timer.isEnded
              ? '00:00:00'
              : timer.isUpcoming
                ? `Starts in: ${timer.formattedRemaining}`
                : '–:–:–'}
        </span>

        {timer.isRunning && (
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
        )}
      </div>
    </div>
  );
}
