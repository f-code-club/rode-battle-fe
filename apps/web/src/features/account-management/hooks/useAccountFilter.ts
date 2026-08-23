import { useMemo, useState } from 'react';
import type { Account, AccountStatusFilter } from '../types';

export function useAccountFilter(accounts: Account[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccountStatusFilter>('all');

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      if (statusFilter === 'active' && account.is_banned) return false;
      if (statusFilter === 'banned' && !account.is_banned) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return account.name.toLowerCase().includes(query) || account.email.toLowerCase().includes(query);
      }

      return true;
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
