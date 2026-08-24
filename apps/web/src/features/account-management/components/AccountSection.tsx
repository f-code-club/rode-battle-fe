import { useState } from 'react';
import { useAccount } from '../hooks/useAccount';
import { useAccountFilter } from '../hooks/useAccountFilter';
import { type Account, DEFAULT_PAGE_SIZE } from '../types';
import AccountTable from './AccountTable';
import AddUserDialog from './AddUserDialog';
import ImportCsvDialog from './ImportCsvDialog';
import ImportPreview from './ImportPreview';
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
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isImportCsvOpen, setIsImportCsvOpen] = useState(false);
  const [previewAccounts] = useState<Account[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const handleFileSelected = (_file: File) => {
    //
  };

  const handleConfirmImport = (_accounts: Account[]) => {
    //
  };

  return (
    <div className="space-y-6">
      <Searchbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        counts={counts}
        onImportCsvClick={() => setIsImportCsvOpen(true)}
        onAddUserClick={() => setIsAddUserOpen(true)}
      />

      <AccountTable
        accounts={paginatedAccounts}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} onCreated={() => {}} />

      <ImportCsvDialog open={isImportCsvOpen} onOpenChange={setIsImportCsvOpen} onFileSelected={handleFileSelected} />

      <ImportPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        accounts={previewAccounts}
        onConfirm={handleConfirmImport}
      />
    </div>
  );
}
