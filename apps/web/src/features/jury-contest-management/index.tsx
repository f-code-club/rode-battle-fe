import JuryLayout from '@/components/layout/JuryLayout';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Plus } from 'lucide-react';
import ContestFilterBar from './components/ContestFilterBar';
import ContestMetricsCards from './components/ContestMetricsCards';
import ContestTable from './components/ContestTable';
import { useContestManagement } from './hooks/useContestManagement';

export default function ContestManagementPage() {
  const { loading, statusFilter, setStatusFilter, page, setPage, totalPages, totalItems, counts, paginatedContests } =
    useContestManagement();

  return (
    <JuryLayout>
      <div className="space-y-6 pb-12 font-sans">
        <div className="flex flex-col gap-2">
          <Link
            to="/jury"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contests Management</h1>
            <Link
              to="/jury/contests/create"
              className="flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700"
            >
              <Plus size={15} /> Create Contest
            </Link>
          </div>
        </div>

        <ContestMetricsCards counts={counts} />

        <div className="space-y-4">
          <ContestFilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} counts={counts} />

          <ContestTable
            contests={paginatedContests}
            loading={loading}
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        </div>
      </div>
    </JuryLayout>
  );
}
