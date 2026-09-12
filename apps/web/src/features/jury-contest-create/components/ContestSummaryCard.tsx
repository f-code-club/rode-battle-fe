import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Calendar, Clock, Layers, Loader2, Trophy } from 'lucide-react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import type { CreateContestFormData } from '../schemas/contest.schema';
import { computeDurationInfo } from '../utils/duration';

interface ContestSummaryCardProps {
  form: UseFormReturn<CreateContestFormData>;
}

export default function ContestSummaryCard({ form }: ContestSummaryCardProps) {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  const contestName = useWatch({ control, name: 'name' });
  const startTime = useWatch({ control, name: 'start' });
  const endTime = useWatch({ control, name: 'end' });
  const problems = useWatch({ control, name: 'problems' }) || [];

  const durationInfo = computeDurationInfo(startTime, endTime);

  const formatDisplayTime = (isoString?: string) => {
    if (!isoString) return 'Not configured';
    const d = dayjs(isoString);
    if (!d.isValid()) return 'Invalid date';
    return d.format('DD/MM/YYYY, HH:mm');
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <h3 className="text-base font-bold text-gray-900">Contest Summary</h3>

      <div className="mt-4 space-y-4 border-t border-gray-100 pt-4 text-xs">
        <div>
          <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">Name</span>
          <p className="mt-0.5 truncate font-bold text-gray-900">
            {contestName?.trim() || <span className="text-gray-400 italic">Untitled Contest</span>}
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <Calendar size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <div>
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">Start Time</span>
            <p className="font-semibold text-gray-800">{formatDisplayTime(startTime)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Calendar size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <div>
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">End Time</span>
            <p className="font-semibold text-gray-800">{formatDisplayTime(endTime)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <div>
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">Duration</span>
            <p className={cn('font-semibold', durationInfo.valid ? 'text-emerald-700' : 'text-amber-700')}>
              {durationInfo.text || 'Not configured'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Layers size={15} className="mt-0.5 shrink-0 text-gray-400" />
          <div>
            <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">Problems</span>
            <p className="font-semibold text-gray-800">
              {problems.length} {problems.length === 1 ? 'task attached' : 'tasks attached'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-gray-100 pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Creating Contest...</span>
            </>
          ) : (
            <>
              <Trophy size={16} />
              <span>Create Contest</span>
            </>
          )}
        </button>

        <Link
          to="/jury"
          className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
