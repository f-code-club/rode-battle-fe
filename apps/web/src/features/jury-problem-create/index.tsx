import JuryLayout from '@/components/layout/JuryLayout';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import CheckerCard from './components/CheckerCard';
import GeneralCard from './components/GeneralCard';
import LimitsCard from './components/LimitsCard';
import ProblemSuccessModal from './components/ProblemSuccessModal';
import PublishCard from './components/PublishCard';
import StatementCard from './components/StatementCard';
import TargetImageCard from './components/TargetImageCard';
import { useCreateProblem } from './hooks/useCreateProblem';

export default function ProblemCreatePage() {
  const navigate = useNavigate();
  const { form, problemType, isSubmitting, createdProblem, handleTypeChange, submitProblem, resetForm } =
    useCreateProblem();

  const openProblem = (problemId: string) => navigate({ to: '/jury/problems/$problemId', params: { problemId } });

  return (
    <JuryLayout>
      <div className="space-y-5 pb-12">
        <div className="flex flex-col gap-2">
          <Link
            to="/jury"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create problem</h1>
        </div>

        <form noValidate onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <GeneralCard
                form={form}
                problemType={problemType}
                onTypeChange={handleTypeChange}
                disabled={isSubmitting}
              />

              {problemType === 'CSS_BATTLE' ? (
                <TargetImageCard form={form} disabled={isSubmitting} />
              ) : (
                <>
                  <LimitsCard form={form} disabled={isSubmitting} />
                  <StatementCard form={form} disabled={isSubmitting} />
                  <CheckerCard form={form} disabled={isSubmitting} />
                </>
              )}
            </div>

            <div>
              <PublishCard
                form={form}
                problemType={problemType}
                isSubmitting={isSubmitting}
                onConfirmedSubmit={() => submitProblem(form.getValues())}
              />
            </div>
          </div>
        </form>

        {createdProblem && (
          <ProblemSuccessModal
            problemId={createdProblem.id}
            problemName={createdProblem.name}
            problemType={createdProblem.type}
            onClose={resetForm}
            onCreateAnother={resetForm}
            onViewDetail={openProblem}
          />
        )}
      </div>
    </JuryLayout>
  );
}
