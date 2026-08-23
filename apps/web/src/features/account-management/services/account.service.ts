import type { Account } from '../types';

const BASE_URL = '/api';

export const accountService = {
  getAccounts: async (): Promise<Account[]> => {
    const res = await fetch(`${BASE_URL}/account`);
    if (!res.ok) throw new Error(`Failed to fetch account list`);
    return res.json();
  },
};
