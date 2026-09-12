import JuryLayout from '@/components/layout/JuryLayout';
import { Link } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ContestBasicInfoCard from './components/ContestBasicInfoCard';
import ContestProblemsCard from './components/ContestProblemsCard';
import ContestScheduleCard from './components/ContestScheduleCard';
import ContestSummaryCard from './components/ContestSummaryCard';
import { useCreateContest } from './hooks/useCreateContest';

export default function CreateContestPage() {
  const { form, onSubmit } = useCreateContest();
  const {
    formState: { errors },
  } = form;

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        token: {
          colorPrimary: '#059669',
          borderRadius: 8,
          controlHeight: 44,
          colorBorder: '#e5e7eb',
          fontFamily: 'inherit',
        },
      }}
    >
      <JuryLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Link
              to="/jury"
              className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create Contest</h1>
                <p className="mt-0.5 text-sm text-gray-500">Set up contest schedule and problem assignments.</p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 sm:flex">
                <Sparkles size={14} /> Live Setup
              </div>
            </div>
          </div>

          {errors.root && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <ContestBasicInfoCard form={form} />
                <ContestScheduleCard form={form} />
                <ContestProblemsCard form={form} />
              </div>

              <div className="space-y-6">
                <ContestSummaryCard form={form} />
              </div>
            </div>
          </form>
        </div>
      </JuryLayout>
    </ConfigProvider>
  );
}
