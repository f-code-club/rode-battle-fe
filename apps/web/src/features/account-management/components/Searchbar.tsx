import { cn } from '@/lib/utils';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { AccountStatusFilter } from '../types';

interface SearchbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: AccountStatusFilter;
  onStatusFilterChange: (status: AccountStatusFilter) => void;
  counts?: {
    total: number;
    active: number;
    banned: number;
  };
  onAddUserClick?: () => void;
}

export default function Searchbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  counts,
  onAddUserClick,
}: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '');
      if ((e.key === '/' && !isInputActive) || ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterOptions: { key: AccountStatusFilter; label: string; count?: number }[] = [
    { key: 'all', label: 'All accounts', count: counts?.total },
    { key: 'active', label: 'Active', count: counts?.active },
    { key: 'banned', label: 'Banned', count: counts?.banned },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="group relative flex-1">
        <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter accounts..."
          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white pr-10 pl-10 text-xs shadow-2xs transition-all placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute top-1/2 right-3 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-400 select-none sm:flex">
            /
          </kbd>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenFilter(!openFilter)}
            className={cn(
              'flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-3.5 text-xs font-semibold shadow-2xs transition-all focus:outline-none',
              statusFilter !== 'all'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-black focus:border-gray-400',
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Status</span>
            {statusFilter !== 'all' && (
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {statusFilter === 'active' ? 'Active' : 'Banned'}
              </span>
            )}
          </button>

          {openFilter && (
            <div className="absolute right-0 z-20 mt-1.5 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
              {filterOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    onStatusFilterChange(opt.key);
                    setOpenFilter(false);
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors focus:outline-none',
                    statusFilter === opt.key
                      ? 'bg-gray-100 font-bold text-black'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black',
                  )}
                >
                  <span>{opt.label}</span>
                  {opt.count !== undefined && (
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-medium',
                        statusFilter === opt.key ? 'bg-black font-bold text-white' : 'bg-gray-100 text-gray-500',
                      )}
                    >
                      {opt.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onAddUserClick}
          className="flex h-10 cursor-pointer items-center rounded-lg bg-black px-4 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 focus:outline-none active:scale-95"
        >
          Add user
        </button>
      </div>
    </div>
  );
}
