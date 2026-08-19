import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

type ContestStatus = 'upcoming' | 'running' | 'ended';

interface CountdownTimerProps {
  start: string;
  end: string;
}

function getStatus(start: string, end: string): ContestStatus {
  const now = Date.now();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (now < startTime) return 'upcoming';
  if (now > endTime) return 'ended';
  return 'running';
}

function getRemainingSeconds(end: string): number {
  return Math.max(0, Math.floor((new Date(end).getTime() - Date.now()) / 1000));
}

function getDurationSeconds(start: string, end: string): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return Math.max(1, Math.floor((endTime - startTime) / 1000));
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export default function CountdownTimer({ start, end }: CountdownTimerProps) {
  const [status, setStatus] = useState<ContestStatus>(() => getStatus(start, end));
  const [initialRemaining] = useState(() => getRemainingSeconds(end));
  const [duration] = useState(() => getDurationSeconds(start, end));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(start, end));
    }, 1000);
    return () => clearInterval(interval);
  }, [start, end]);

  if (status === 'upcoming') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50/40 px-1 text-center">
          <span className="text-[11px] leading-tight font-semibold text-blue-500">Coming Soon</span>
        </div>
      </div>
    );
  }

  if (status === 'ended') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-gray-200">
          <span className="text-xs font-semibold text-gray-400">Ended</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <CountdownCircleTimer
        key="running-timer"
        isPlaying
        duration={duration}
        initialRemainingTime={initialRemaining}
        size={76}
        strokeWidth={4}
        colors={['#14b8a6', '#eab308', '#ef4444']}
        colorsTime={[duration, Math.floor(duration / 2), 0]}
        trailColor="#e5e7eb"
        onComplete={() => setStatus(getStatus(start, end))}
      >
        {({ remainingTime }) => (
          <span className="text-xs font-semibold tracking-tight text-gray-800 tabular-nums">
            {formatTime(remainingTime)}
          </span>
        )}
      </CountdownCircleTimer>
      <span className="text-[11px] font-medium text-gray-400">Remaining</span>
    </div>
  );
}
