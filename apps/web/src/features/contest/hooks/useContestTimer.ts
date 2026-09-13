import { getCurrentServerTime } from '@/lib/http';
import { useEffect, useState } from 'react';

export type ContestTimeStatus = 'upcoming' | 'running' | 'ended' | 'unknown';

export interface ContestTimerInfo {
  status: ContestTimeStatus;
  remainingSeconds: number;
  durationSeconds: number;
  formattedRemaining: string;
  isUpcoming: boolean;
  isRunning: boolean;
  isEnded: boolean;
}

export function getContestStatus(start?: string, end?: string, now = getCurrentServerTime()): ContestTimeStatus {
  if (!start || !end) return 'unknown';
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (Number.isNaN(startTime) || Number.isNaN(endTime)) return 'unknown';
  if (now < startTime) return 'upcoming';
  if (now > endTime) return 'ended';
  return 'running';
}

function getRemainingSeconds(targetTime?: string, now = getCurrentServerTime()): number {
  if (!targetTime) return 0;
  const target = new Date(targetTime).getTime();
  if (Number.isNaN(target)) return 0;
  return Math.max(0, Math.floor((target - now) / 1000));
}

function getDurationSeconds(start?: string, end?: string): number {
  if (!start || !end) return 1;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (Number.isNaN(startTime) || Number.isNaN(endTime)) return 1;
  return Math.max(1, Math.floor((endTime - startTime) / 1000));
}

export function formatContestTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export function useContestTimer(start?: string, end?: string): ContestTimerInfo {
  const [, setTick] = useState(0);

  const now = getCurrentServerTime();
  const status = getContestStatus(start, end, now);
  const remainingSeconds = status === 'upcoming' ? getRemainingSeconds(start, now) : getRemainingSeconds(end, now);
  const durationSeconds = getDurationSeconds(start, end);

  useEffect(() => {
    if (!start || !end || status === 'ended' || status === 'unknown') return;

    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, end, status]);

  return {
    status,
    remainingSeconds,
    durationSeconds,
    formattedRemaining: formatContestTime(remainingSeconds),
    isUpcoming: status === 'upcoming',
    isRunning: status === 'running',
    isEnded: status === 'ended',
  };
}
