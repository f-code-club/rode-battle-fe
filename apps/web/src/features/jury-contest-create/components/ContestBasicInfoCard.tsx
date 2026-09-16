import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import type { CreateContestFormData } from '../schemas/contest.schema';

interface ContestBasicInfoCardProps {
  form: UseFormReturn<CreateContestFormData>;
}

export default function ContestBasicInfoCard({ form }: ContestBasicInfoCardProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const contestName = useWatch({ control, name: 'name' });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <Trophy size={20} />
        </div>
        <h3 className="text-base font-bold text-gray-900">Basic Information</h3>
      </div>

      <div>
        <label
          htmlFor="contest-name"
          className="mb-1.5 flex items-center justify-between text-sm font-semibold text-gray-800"
        >
          <span>
            Contest Name <span className="text-red-500">*</span>
          </span>
          <span className="text-xs font-normal text-gray-400">{contestName?.length || 0}/100</span>
        </label>
        <input
          id="contest-name"
          type="text"
          className={cn(
            'h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none',
            errors.name && 'border-red-400 focus:border-red-500 focus:ring-red-500',
          )}
          {...register('name')}
        />
        {errors.name?.message && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
    </div>
  );
}
