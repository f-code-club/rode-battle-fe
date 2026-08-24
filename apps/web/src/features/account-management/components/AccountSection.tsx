import { useAccount } from '../hooks/useAccount';
import { useAccountFilter } from '../hooks/useAccountFilter';
import { type Account, DEFAULT_PAGE_SIZE } from '../types';
import AccountTable from './AccountTable';
import Searchbar from './Searchbar';

interface AccountSectionProps {
  accounts?: Account[];
  pageSize?: number;
}

export default function AccountSection({
  accounts: customAccounts,
  pageSize = DEFAULT_PAGE_SIZE,
}: AccountSectionProps) {
  const fetchedAccounts = useAccount();
  const accounts = customAccounts ?? fetchedAccounts;

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    paginatedAccounts,
    counts,
    page,
    setPage,
    totalPages,
    totalItems,
  } = useAccountFilter(accounts, pageSize);

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

      <AccountTable
        accounts={paginatedAccounts}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
