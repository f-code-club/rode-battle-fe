import JudgeLayout from '@/components/layout/JudgeLayout';
import { Download, LayoutGrid, MessageSquare, Plus, Sparkles } from 'lucide-react';
import { QuickLinkCard } from './components/QuickLinkCard';

export const JudgeDashboardPage = () => {
  return (
    <JudgeLayout>
      <div className="space-y-8 pb-12 font-sans">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Judge dashboard</h1>
            <p className="text-sm text-gray-500">Managing 2 active contests and 5 open clarifications.</p>
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
              <h2 className="text-lg font-bold text-gray-900">Welcome back, Admin!</h2>
              <p className="text-sm text-gray-500">Welcome to the online judging and contest management system.</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-gray-900">Quick links</h3>
            <span className="font-mono text-xs font-semibold tracking-wider text-gray-400 uppercase">judge tools</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <QuickLinkCard
              icon={<Plus size={20} />}
              badgeText="new"
              title="Create contest"
              description="Spin up a new round — set problems, scoring, schedule, and visibility."
              statText="3 drafts"
              actionText="Start"
            />
            <QuickLinkCard
              icon={<LayoutGrid size={18} />}
              badgeText="2 live"
              showPulseDot
              title="Manage contests"
              description="Edit running rounds, adjust problemsets, rejudge, and publish standings."
              statText="12 total"
              actionText="Open"
            />
            <QuickLinkCard
              icon={<MessageSquare size={18} />}
              badgeText="5 open"
              showPulseDot
              title="Clarifications"
              description="Answer participant questions, publish global notes, and triage reports."
              statText="2 overdue"
              actionText="Review"
            />
          </div>
        </div>
      </div>
    </JudgeLayout>
  );
};
