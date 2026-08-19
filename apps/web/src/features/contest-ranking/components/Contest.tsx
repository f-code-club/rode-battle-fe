import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { Contest } from '../types';
import CountdownTimer from './CountdownTimer';

interface ContestProps {
  contest: Contest;
}

export default function Contest({ contest }: ContestProps) {
  const date = new Date(contest.start).toLocaleDateString('vi-VN');
  const start = new Date(contest.start).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const end = new Date(contest.end).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="mb-8 space-y-2">
      <Link
        to="/home"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 no-underline transition-colors hover:text-gray-700 hover:no-underline"
      >
        <ArrowLeft size={14} />
        Back
      </Link>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{contest.name}</h1>
          <p className="text-sm text-gray-400">
            {date}, {start} – {end}
          </p>
        </div>
        <CountdownTimer start={contest.start} end={contest.end} />
      </div>
    </div>
  );
}
