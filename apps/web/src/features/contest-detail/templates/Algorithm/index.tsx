import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';
import StatementPanel from '@/features/contest-detail/components/StatementPanel';
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
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/contest/$contestId"
              params={{ contestId }}
              className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={14} />
              Back to problems
            </Link>

            {timer.status !== 'unknown' && (
              <div className="flex items-center gap-2.5 rounded-sm border border-gray-200 bg-white px-3 py-1.5 shadow-2xs">
                <span className="text-xs font-semibold text-gray-700">{contestData?.contestTitle ?? 'Contest'}</span>
                <span className="text-xs text-gray-400">•</span>
                <span
                  className={`font-mono text-xs font-semibold ${
                    timer.status === 'running'
                      ? 'text-emerald-700'
                      : timer.status === 'ended'
                        ? 'text-red-600'
                        : 'text-blue-600'
                  }`}
                >
                  {timer.status === 'running'
                    ? `Time remaining: ${timer.formattedRemaining}`
                    : timer.status === 'ended'
                      ? 'Contest ended'
                      : `Starts in ${timer.formattedRemaining}`}
                </span>
              </div>
            )}
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
