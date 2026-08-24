import { rankItem } from '@tanstack/match-sorter-utils';
import { useMemo, useState } from 'react';
import type { Account, AccountStatusFilter } from '../types';

function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export function useAccountFilter(accounts: Account[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccountStatusFilter>('all');

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
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredAccounts,
    counts,
  };
}
