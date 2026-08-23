import { useAccount } from '../hooks/useAccount';
import { useAccountFilter } from '../hooks/useAccountFilter';
import type { Account } from '../types';
import AccountTable from './AccountTable';
import Searchbar from './Searchbar';

interface AccountSectionProps {
  accounts?: Account[];
}

export default function AccountSection({ accounts: customAccounts }: AccountSectionProps) {
  const fetchedAccounts = useAccount();
  const accounts = customAccounts ?? fetchedAccounts;

  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, filteredAccounts, counts } =
    useAccountFilter(accounts);

  return (
    <div className="space-y-6">
      <Searchbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        counts={counts}
        onAddUserClick={() => {
          //
        }}
      />

      <AccountTable accounts={filteredAccounts} />
    </div>
  );
}
