import { useContests } from '@/features/jury-dashboard/hooks/useContests';
import { useCallback, useMemo, useState } from 'react';
import type { ContestStatusFilter } from '../types';
import { hasEnded, isLive, isUpcoming, sortContestsByPriority } from '../utils';

export function useContestManagement(pageSize = 10) {
  const { data: contests = [], isPending: loading, error, refetch } = useContests();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContestStatusFilter>('all');
  const [page, setPage] = useState(1);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((status: ContestStatusFilter) => {
    setStatusFilter(status);
    setPage(1);
  }, []);

  const counts = useMemo(() => {
    let live = 0;
    let upcoming = 0;
    let ended = 0;

    for (const c of contests) {
      if (isLive(c)) live++;
      else if (isUpcoming(c)) upcoming++;
      else if (hasEnded(c)) ended++;
    }

    return {
      all: contests.length,
      live,
      upcoming,
      ended,
    };
  }, [contests]);

  const filteredContests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matched = contests.filter((c) => {
      const matchName = !query || c.name.toLowerCase().includes(query);
      if (!matchName) return false;

      if (statusFilter === 'live') return isLive(c);
      if (statusFilter === 'upcoming') return isUpcoming(c);
      if (statusFilter === 'ended') return hasEnded(c);
      return true;
    });

    return sortContestsByPriority(matched);
  }, [contests, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredContests.length / pageSize));

  const paginatedContests = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredContests.slice(start, start + pageSize);
  }, [filteredContests, page, pageSize]);

  return {
    contests,
    loading,
    error,
    refetch,
    searchQuery,
    setSearchQuery: handleSearchChange,
    statusFilter,
    setStatusFilter: handleStatusChange,
    page,
    setPage,
    totalPages,
    totalItems: filteredContests.length,
    counts,
    paginatedContests,
  };
}
