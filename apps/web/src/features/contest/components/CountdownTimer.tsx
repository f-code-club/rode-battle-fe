import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useContestTimer, type ContestTimerInfo } from '../hooks/useContestTimer';

interface CountdownTimerProps {
  start: string;
  end: string;
  tone?: 'light' | 'dark';
  timer?: ContestTimerInfo;
}

export default function CountdownTimer({ start, end, tone = 'light', timer: timerProp }: CountdownTimerProps) {
  const ownTimer = useContestTimer(timerProp ? undefined : start, timerProp ? undefined : end);
  const timer = timerProp ?? ownTimer;
  const isDark = tone === 'dark';

  if (timer.status === 'upcoming') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={`flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 px-1 text-center shadow-sm ${
            isDark ? 'border-blue-400/80 bg-blue-950/70 text-white shadow-blue-500/20' : 'border-blue-200 bg-blue-50/50'
          }`}
        >
          <span
            className={`text-[9px] font-black tracking-wider uppercase ${isDark ? 'text-blue-300' : 'text-blue-600'}`}
          >
            Starts in
          </span>
          <span className={`font-mono text-xs font-black tabular-nums ${isDark ? 'text-white' : 'text-blue-700'}`}>
            {timer.formattedRemaining}
          </span>
        </div>
        <span className={`text-[11px] font-bold ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>Upcoming</span>
      </div>
    );
  }

  if (timer.status === 'ended') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${
            isDark ? 'border-rose-500/50 bg-rose-950/40' : 'border-gray-200'
          }`}
        >
          <span className={`text-xs font-bold tracking-wider uppercase ${isDark ? 'text-rose-300' : 'text-gray-400'}`}>
            Ended
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <CountdownCircleTimer
        key={`${start}-${end}`}
        isPlaying
        duration={timer.durationSeconds}
        initialRemainingTime={timer.remainingSeconds}
        size={isDark ? 84 : 76}
        strokeWidth={isDark ? 5 : 4}
        colors={['#10b981', '#f59e0b', '#ef4444']}
        colorsTime={[timer.durationSeconds, Math.floor(timer.durationSeconds / 2), 0]}
        trailColor={isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'}
      >
        {() => (
          <span
            className={`font-mono tracking-wider tabular-nums ${
              isDark
                ? 'text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                : 'text-xs font-semibold tracking-tight text-gray-800'
            }`}
          >
            {timer.formattedRemaining}
          </span>
        )}
      </CountdownCircleTimer>
      <span
        className={`text-[11px] font-bold tracking-wide uppercase ${isDark ? 'text-emerald-300' : 'text-gray-400'}`}
      >
        Remaining
      </span>
    </div>
  );
}
