import { Calendar, CheckCircle2, Radio, Trophy } from 'lucide-react';

interface ContestMetricsCardsProps {
  counts: {
    all: number;
    live: number;
    upcoming: number;
    ended: number;
  };
}

export default function ContestMetricsCards({ counts }: ContestMetricsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Total</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
            <Trophy size={16} />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-gray-900">{counts.all}</div>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">Live</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <Radio size={16} className={counts.live > 0 ? 'animate-pulse' : ''} />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-emerald-900">{counts.live}</div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-blue-800 uppercase">Upcoming</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <Calendar size={16} />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-blue-900">{counts.upcoming}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Ended</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold text-gray-900">{counts.ended}</div>
      </div>
    </div>
  );
}
