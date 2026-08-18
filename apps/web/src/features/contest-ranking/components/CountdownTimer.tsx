import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

type ContestStatus = 'upcoming' | 'running' | 'ended';

interface CountdownTimerProps {
  start: string;
  end: string;
}

function getStatus(start: Date, end: Date): ContestStatus {
  const now = new Date();
  if (now < start) return 'upcoming';
  if (now > end) return 'ended';
  return 'running';
}

function getRemainingSeconds(start: Date, end: Date, status: ContestStatus): number {
  const now = new Date();
  if (status === 'upcoming') return Math.max(0, Math.floor((start.getTime() - now.getTime()) / 1000));
  if (status === 'running') return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  return 0;
}

function getDuration(start: Date, end: Date, status: ContestStatus): number {
  if (status === 'upcoming') return Math.floor((start.getTime() - Date.now()) / 1000);
  if (status === 'running') return Math.floor((end.getTime() - start.getTime()) / 1000);
  return 0;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

const STATUS_LABELS: Record<ContestStatus, string> = {
  upcoming: 'Starts in',
  running: 'Remaining',
  ended: 'Ended',
};

export default function CountdownTimer({ start, end }: CountdownTimerProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const [status, setStatus] = useState<ContestStatus>(() => getStatus(startDate, endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(startDate, endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [start, end]);

  if (status === 'ended') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-200">
          <span className="text-xs font-semibold text-gray-400">Ended</span>
        </div>
      </div>
    );
  }

  const duration = getDuration(startDate, endDate, status);
  const remaining = getRemainingSeconds(startDate, endDate, status);

  return (
    <div className="flex flex-col items-center gap-1">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        initialRemainingTime={remaining}
        size={64}
        strokeWidth={4}
        colors={status === 'upcoming' ? '#3b82f6' : ['#22c55e', '#eab308', '#ef4444']}
        colorsTime={status === 'upcoming' ? undefined : [duration, duration / 2, 0]}
        trailColor="#e5e7eb"
        onComplete={() => setStatus(getStatus(startDate, endDate))}
      >
        {({ remainingTime }) => <span className="text-xs font-bold tabular-nums">{formatTime(remainingTime)}</span>}
      </CountdownCircleTimer>
      <span className="text-[10px] font-medium text-gray-400">{STATUS_LABELS[status]}</span>
    </div>
  );
}
