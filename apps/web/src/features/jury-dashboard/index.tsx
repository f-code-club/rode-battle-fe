import JuryLayout from '@/components/layout/JuryLayout';
import ContestsSection from '@/features/jury-dashboard/components/ContestsSection';
import QuickLinkCard from '@/features/jury-dashboard/components/QuickLinkCard';
import { useContests } from '@/features/jury-dashboard/hooks/useContests';
import { isLive, isUpcoming } from '@/features/jury-dashboard/utils';
import { Link } from '@tanstack/react-router';
import { FilePlus2, LayoutGrid, Plus } from 'lucide-react';

export default function JuryDashboardPage() {
  const { data: contests = [], isPending: loading } = useContests();

  const liveCount = contests.filter(isLive).length;
  const upcomingCount = contests.filter(isUpcoming).length;

  return (
    <JuryLayout>
      <div className="space-y-8 pb-12 font-sans">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Jury dashboard</h1>
            <p className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${liveCount} live · ${upcomingCount} upcoming · ${contests.length} total`}
            </p>
          </div>
          <Link
            to="/jury/contests/create"
            className="flex w-fit items-center gap-2 rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-gray-800"
          >
            <Plus size={15} />
            Create contest
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <QuickLinkCard
            icon={<Plus size={18} />}
            title="Create contest"
            description="Set the schedule and assign problems to a new round."
            actionText="Start"
            to="/jury/contests/create"
          />
          <QuickLinkCard
            icon={<FilePlus2 size={18} />}
            title="Create problem"
            description="Write an algorithm statement with a checker, or upload a CSS Battle target."
            actionText="Start"
            to="/jury/problems/create"
          />
          <QuickLinkCard
            icon={<LayoutGrid size={18} />}
            title="Manage contests"
            description="Browse every round, filter by status, and open its problem set."
            actionText="Open"
            to="/jury/contests"
            stat={loading ? undefined : `${contests.length} total`}
          />
        </div>

        <ContestsSection contests={contests} loading={loading} />
      </div>
    </JuryLayout>
  );
}
