import Footer from '@/components/layout/DashboardLayout/components/Footer';
import Header from '@/components/layout/DashboardLayout/components/Header';
import { useProblemStatus } from '@/features/contest/hooks/useProblemProgress';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import type { ContestDetailData } from '../../types';
import ProblemInfoPanel from './components/ProblemInfoPanel';
import StatementPanel from './components/StatementPanel';
import SubmissionHistoryPanel from './components/SubmissionHistoryPanel';
import SubmitPanel from './components/SubmitPanel';
import { useSubmissionHistory } from './hooks/useSubmissionHistory';

interface BeAlgorithmTemplateProps {
  contestId: string;
  problemId: string;
  contestData?: ContestDetailData;
}

export default function BeAlgorithmTemplate({ contestId, problemId, contestData }: BeAlgorithmTemplateProps) {
  const { markSubmitted } = useProblemStatus(contestId, problemId);
  const { history, addSubmission } = useSubmissionHistory(contestId, problemId);
  const meta = contestData?.algorithm;

  const handleSubmit = (fileName: string, languageLabel: string) => {
    addSubmission(fileName, languageLabel);
    markSubmitted();
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
              statementMarkdown={meta?.statementMarkdown}
            />

            <div className="flex flex-col gap-4">
              <SubmitPanel languages={meta?.allowedLanguages ?? []} onSubmit={handleSubmit} />
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
