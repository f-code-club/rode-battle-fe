import { rankItem } from '@tanstack/match-sorter-utils';
import { useMemo, useState } from 'react';
import { type Account, type AccountStatusFilter, DEFAULT_PAGE_SIZE } from '../types';

function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function useAccountFilter(accounts: Account[], initialPageSize = DEFAULT_PAGE_SIZE) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccountStatusFilter>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleStatusFilterChange = (status: AccountStatusFilter) => {
    setStatusFilter(status);
    setPage(1);
  };

  const filteredAccounts = useMemo(() => {
    const query = searchQuery.trim();
    const normalizedQuery = normalizeText(query);

    return accounts.filter((account) => {
      if (statusFilter === 'active' && account.is_banned) return false;
      if (statusFilter === 'banned' && !account.is_banned) return false;

      if (!query) return true;

      const nameMatch = rankItem(normalizeText(account.name), normalizedQuery).passed;
      const emailMatch = rankItem(account.email.toLowerCase(), query.toLowerCase()).passed;

      return nameMatch || emailMatch;
    });
  }, [accounts, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredAccounts.length / pageSize) || 1;

  const paginatedAccounts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAccounts.slice(start, start + pageSize);
  }, [filteredAccounts, page, pageSize]);

  const counts = useMemo(
    () => ({
      total: accounts.length,
      active: accounts.filter((a) => !a.is_banned).length,
      banned: accounts.filter((a) => a.is_banned).length,
    }),
    [accounts],
  );

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    statusFilter,
    setStatusFilter: handleStatusFilterChange,
    filteredAccounts,
    paginatedAccounts,
    counts,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems: filteredAccounts.length,
  };
}
