import JuryLayout from '@/components/layout/JuryLayout';
import { useContestDetail } from '@/features/jury-dashboard/hooks/useContestDetail';
import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ContestInfoCard from './components/ContestInfoCard';
import ContestProblemsTable from './components/ContestProblemsTable';

export default function ContestDetailPage() {
  const { contestId } = useParams({ from: '/_authenticated/jury/contests/$contestId/' });
  const { data: contest, isPending: loading, error } = useContestDetail(contestId);

  return (
    <JuryLayout>
      <div className="space-y-6 pb-12 font-sans">
        <div className="flex flex-col gap-2">
          <Link
            to="/jury/contests"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={14} /> Back to Contests
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Contest Detail</h1>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={22} className="animate-spin text-emerald-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error.message}
          </div>
        )}

        {!loading && contest && (
          <>
            <ContestInfoCard contest={contest} />
            <ContestProblemsTable problems={contest.problems} />
          </>
        )}
      </div>
    </JuryLayout>
  );
}
