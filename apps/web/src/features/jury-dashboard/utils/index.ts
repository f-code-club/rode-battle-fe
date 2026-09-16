import type { ContestSummary } from '../types';

export function isLive(contest: ContestSummary): boolean {
  const now = Date.now();
  return now >= new Date(contest.start).getTime() && now <= new Date(contest.end).getTime();
}

export function isUpcoming(contest: ContestSummary): boolean {
  return Date.now() < new Date(contest.start).getTime();
}

export function hasEnded(contest: ContestSummary): boolean {
  return Date.now() > new Date(contest.end).getTime();
}

export function getTimeInfo(contest: ContestSummary): string {
  const now = Date.now();
  const start = new Date(contest.start).getTime();
  const end = new Date(contest.end).getTime();

  if (now < start) {
    return `starts in ${formatDuration(start - now)}`;
  }
  if (now <= end) {
    return `${formatDuration(end - now)} left`;
  }
  return 'ended';
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getStatusBadge(contest: ContestSummary): string {
  if (isLive(contest)) return 'LIVE';
  if (isUpcoming(contest)) return 'UPCOMING';
  return 'ENDED';
}

export function sortContestsByPriority(contests: ContestSummary[]): ContestSummary[] {
  const now = Date.now();

  const live: ContestSummary[] = [];
  const upcoming: ContestSummary[] = [];
  const ended: ContestSummary[] = [];

  for (const contest of contests) {
    const start = new Date(contest.start).getTime();
    const end = new Date(contest.end).getTime();

    if (now >= start && now <= end) {
      live.push(contest);
    } else if (now < start) {
      upcoming.push(contest);
    } else {
      ended.push(contest);
    }
  }

  live.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
  upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  ended.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime());

  return [...live, ...upcoming, ...ended];
}
