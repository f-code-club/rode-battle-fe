import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';
import ProblemQuickSwitcher from '@/features/contest-detail/components/ProblemQuickSwitcher';
import StatementPanel from '@/features/contest-detail/components/StatementPanel';
import ArenaTimerBadge from '@/features/contest/components/ArenaTimerBadge';
import { useContestTimer } from '@/features/contest/hooks/useContestTimer';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useProblemHistory } from '../../hooks/useProblemHistory';
import { useSubmitProblem } from '../../hooks/useSubmitProblem';
import type { BeAlgorithmLanguageOption, ContestDetailData } from '../../types';
import ProblemInfoPanel from './components/ProblemInfoPanel';
import SubmissionHistoryPanel from './components/SubmissionHistoryPanel';
import SubmitPanel from './components/SubmitPanel';

interface AlgorithmTemplateProps {
  contestId: string;
  problemId: string;
  contestData?: ContestDetailData;
}

export default function AlgorithmTemplate({ contestId, problemId, contestData }: AlgorithmTemplateProps) {
  const meta = contestData?.algorithm;
  const timer = useContestTimer(contestData?.contestStart, contestData?.contestEnd);
  const { data: history = [], isError: isHistoryError } = useProblemHistory(problemId);
  const submitMutation = useSubmitProblem(problemId);

  const handleSubmit = async (language: BeAlgorithmLanguageOption['id'], code: string): Promise<boolean> => {
    try {
      await submitMutation.mutateAsync({ language, code });
      toast.success('Solution submitted.');
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit solution.');
      return false;
    }
  };

  const isLocked = timer.status === 'ended' || timer.status === 'upcoming';
  const lockReason =
    timer.status === 'ended'
      ? 'Contest has ended'
      : timer.status === 'upcoming'
        ? 'Contest has not started yet'
        : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="w-full flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
              <Link
                to="/contest/$contestId"
                params={{ contestId }}
                title="Quay lại danh sách bài thi"
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200/90 bg-white text-gray-600 shadow-2xs transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:scale-95"
              >
                <ArrowLeft size={16} />
              </Link>
              <span className="text-sm font-bold tracking-tight text-gray-900 sm:text-base">
                {contestData?.contestTitle ?? 'Contest Arena'}
              </span>
            </div>

            {contestId && problemId && contestData?.problems && contestData.problems.length > 0 && (
              <div className="order-3 flex w-full justify-center md:order-2 md:w-auto">
                <ProblemQuickSwitcher
                  contestId={contestId}
                  currentProblemId={problemId}
                  problems={contestData.problems}
                  variant="light"
                />
              </div>
            )}

            <div className="order-2 flex items-center gap-2.5 sm:gap-3 md:order-3">
              {contestData?.contestStart && contestData?.contestEnd && (
                <ArenaTimerBadge start={contestData.contestStart} end={contestData.contestEnd} timer={timer} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[65fr_35fr]">
            <StatementPanel
              title={contestData?.title ?? 'Untitled problem'}
              statementMarkdown={contestData?.statementMarkdown}
            />

            <div className="flex flex-col gap-4">
              <SubmitPanel
                languages={meta?.allowedLanguages ?? []}
                onSubmit={handleSubmit}
                isSubmitting={submitMutation.isPending}
                isLocked={isLocked}
                lockReason={lockReason}
              />
              <ProblemInfoPanel meta={meta} />
              <SubmissionHistoryPanel history={history} isError={isHistoryError} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
