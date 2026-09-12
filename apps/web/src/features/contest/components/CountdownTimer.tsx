import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useContestTimer } from '../hooks/useContestTimer';

interface CountdownTimerProps {
  start: string;
  end: string;
}

export default function CountdownTimer({ start, end }: CountdownTimerProps) {
  const timer = useContestTimer(start, end);

  if (timer.status === 'upcoming') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-19 w-19 flex-col items-center justify-center rounded-full border-4 border-blue-200 bg-blue-50/50 px-1 text-center">
          <span className="text-[9px] font-bold tracking-tight text-blue-600 uppercase">Starts in</span>
          <span className="font-mono text-xs font-bold text-blue-700 tabular-nums">{timer.formattedRemaining}</span>
        </div>
        <span className="text-[11px] font-medium text-blue-500">Upcoming</span>
      </div>
    );
  }

  if (timer.status === 'ended') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-19 w-19 items-center justify-center rounded-full border-4 border-gray-200">
          <span className="text-xs font-semibold text-gray-400">Ended</span>
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
        size={76}
        strokeWidth={4}
        colors={['#14b8a6', '#eab308', '#ef4444']}
        colorsTime={[timer.durationSeconds, Math.floor(timer.durationSeconds / 2), 0]}
        trailColor="#e5e7eb"
      >
        {() => (
          <span className="text-xs font-semibold tracking-tight text-gray-800 tabular-nums">
            {timer.formattedRemaining}
          </span>
        )}
      </CountdownCircleTimer>
      <span className="text-[11px] font-medium text-gray-400">Remaining</span>
    </div>
  );
}
