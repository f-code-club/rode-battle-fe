import { useEffect, useState } from 'react';
import { accountService } from '../services/account.service';
import type { Account } from '../types';

export const useAccount = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    accountService.getAccounts().then((data) => setAccounts(data));
  }, []);

  return accounts;
};
