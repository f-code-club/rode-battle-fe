import JuryLayout from '@/components/layout/JuryLayout';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ProblemHeader from './components/ProblemHeader';
import ProblemStatement from './components/ProblemStatement';
import { useProblemDetail } from './hooks/useProblemDetail';

interface ProblemDetailPageProps {
  problemId: string;
}

export default function ProblemDetailPage({ problemId }: ProblemDetailPageProps) {
  const { data, isLoading, error } = useProblemDetail(problemId);

  return (
    <JuryLayout>
      <div className="mx-auto max-w-4xl pb-16">
        <Link
          to="/jury"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} /> Dashboard
        </Link>

        {isLoading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-emerald-600" size={28} />
          </div>
        )}

        {error && <p className="py-24 text-center text-sm text-red-600">{error}</p>}

        {data && (
          <article className="mt-6">
            <ProblemHeader problemId={problemId} problem={data} />
            <ProblemStatement problem={data} />
          </article>
        )}
      </div>
    </JuryLayout>
  );
}
