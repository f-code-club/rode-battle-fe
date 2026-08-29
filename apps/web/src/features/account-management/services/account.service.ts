import type { Account } from '../types';

const BASE_URL = '/api';

export const accountService = {
  getAccounts: async (): Promise<Account[]> => {
    const res = await fetch(`${BASE_URL}/account`);
    if (!res.ok) throw new Error(`Failed to fetch account list`);
    return res.json();
  },

  createAccounts: async (accounts: Pick<Account, 'name' | 'email' | 'role'>[]): Promise<void> => {
    const res = await fetch(`${BASE_URL}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accounts),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as { message?: string }).message ?? 'Failed to create account');
    }
  },
};
