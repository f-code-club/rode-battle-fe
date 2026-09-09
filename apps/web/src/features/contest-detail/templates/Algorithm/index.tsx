import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';
import StatementPanel from '@/features/contest-detail/components/StatementPanel';
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
  const { data: history = [] } = useProblemHistory(problemId);
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="w-full flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/contest/$contestId"
            params={{ contestId }}
            className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={14} />
            Back to problems
          </Link>

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
              />
              <ProblemInfoPanel meta={meta} />
              <SubmissionHistoryPanel history={history} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
