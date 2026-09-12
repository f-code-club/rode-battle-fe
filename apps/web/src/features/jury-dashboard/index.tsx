import JuryLayout from '@/components/layout/JuryLayout';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import ClarificationsSection from '@/features/jury-dashboard/components/ClarificationsSection';
import ContestsSection from '@/features/jury-dashboard/components/ContestsSection';
import LiveContestSection from '@/features/jury-dashboard/components/LiveContestSection';
import QuickLinkCard from '@/features/jury-dashboard/components/QuickLinkCard';
import {
  useContestDetail,
  useContestRank,
  useContests,
  useLiveContest,
} from '@/features/jury-dashboard/hooks/useContests';
import { isLive } from '@/features/jury-dashboard/utils';
import { Download, LayoutGrid, MessageSquare, Plus, Sparkles } from 'lucide-react';

export default function JuryDashboardPage() {
  const { user } = useAuthContext();
  const { contests, loading } = useContests();
  const liveContest = useLiveContest(contests);
  const { rankings, loading: rankLoading } = useContestRank(liveContest?.id ?? null);
  const { detail: liveContestDetail } = useContestDetail(liveContest?.id ?? null);
  const problemCount = liveContestDetail?.problems?.length ?? 0;

  const liveCount = contests.filter((c) => isLive(c)).length;
  const totalCount = contests.length;

  return (
    <JuryLayout>
      <div className="space-y-8 pb-12 font-sans">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Jury dashboard</h1>
            <p className="text-sm text-gray-500">
              {loading
                ? 'Loading...'
                : `Managing ${liveCount} active contest${liveCount !== 1 ? 's' : ''} · ${totalCount} total`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100">
              <Download size={14} />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-gray-800">
              <Plus size={15} />
              Create contest
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-md border border-green-200 bg-green-50 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Sparkles size={26} className="text-green-600" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-gray-900">Welcome back, {user?.name ?? 'Jury'}!</h2>
              <p className="text-sm text-gray-500">Welcome to the online judging and contest management system.</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-gray-900">Quick links</h3>
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">jury tools</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <QuickLinkCard
              icon={<Plus size={18} />}
              badgeText="New"
              showPulseDot={false}
              title="Create contest"
              description="Spin up a new round — set problems, scoring, schedule, and visibility."
              statText="—"
              actionText="Start"
              to="/jury/contests/create"
            />
            <QuickLinkCard
              icon={<LayoutGrid size={18} />}
              badgeText={liveCount > 0 ? `${liveCount} live` : '—'}
              showPulseDot={liveCount > 0}
              title="Manage contests"
              description="Edit running rounds, adjust problemsets, rejudge, and publish standings."
              statText={`${totalCount} total`}
              actionText="Open"
            />
            <QuickLinkCard
              icon={<MessageSquare size={18} />}
              badgeText="—"
              showPulseDot={false}
              title="Clarifications"
              description="Answer participant questions, publish global notes, and triage reports."
              statText="—"
              actionText="Review"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <LiveContestSection
            contest={liveContest}
            rankings={rankings}
            problemCount={problemCount}
            loading={loading || rankLoading}
          />
          <div className="space-y-6 lg:col-span-1">
            <ClarificationsSection />
            <ContestsSection contests={contests} loading={loading} />
          </div>
        </div>
      </div>
    </JuryLayout>
  );
}
