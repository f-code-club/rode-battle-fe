import { cn } from '@/lib/utils';
import type { ContestStatusFilter } from '../types';

interface ContestFilterBarProps {
  statusFilter: ContestStatusFilter;
  onStatusChange: (status: ContestStatusFilter) => void;
  counts: {
    all: number;
    live: number;
    upcoming: number;
    ended: number;
  };
}

export default function ContestFilterBar({ statusFilter, onStatusChange, counts }: ContestFilterBarProps) {
  const tabs: { id: ContestStatusFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'live', label: 'Live', count: counts.live },
    { id: 'upcoming', label: 'Upcoming', count: counts.upcoming },
    { id: 'ended', label: 'Ended', count: counts.ended },
  ];

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50/70 p-1">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusChange(tab.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all',
                isActive ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900',
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  'py-0.2 rounded-full px-1.5 text-[10px]',
                  isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-400',
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
