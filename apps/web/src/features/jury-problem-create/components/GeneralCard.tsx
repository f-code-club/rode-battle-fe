import type { ProblemType } from '@/features/jury-dashboard/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { COLOR_PRESETS, inputClass, labelClass } from '../constants';
import type { ProblemFormData } from '../schemas/problem.schema';
import SectionCard, { FieldError } from './SectionCard';

interface GeneralCardProps {
  form: UseFormReturn<ProblemFormData>;
  problemType: ProblemType;
  onTypeChange: (type: ProblemType) => void;
  disabled?: boolean;
}

const TYPES: { id: ProblemType; label: string; description: string }[] = [
  { id: 'ALGORITHM', label: 'Algorithm', description: 'Markdown statement, custom checker, time & memory limits.' },
  { id: 'CSS_BATTLE', label: 'CSS Battle', description: 'Contestants recreate a target image with HTML/CSS.' },
];

export default function GeneralCard({ form, problemType, onTypeChange, disabled }: GeneralCardProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;
  const colorCode = useWatch({ control: form.control, name: 'colorCode' }) ?? '';

  return (
    <SectionCard title="General">
      <div className="space-y-5">
        <div>
          <span className={labelClass}>Type</span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Problem type">
            {TYPES.map((t) => {
              const active = problemType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  disabled={disabled}
                  onClick={() => onTypeChange(t.id)}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors',
                    active
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                      active ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300 bg-white',
                    )}
                  >
                    {active && <Check size={10} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900">{t.label}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{t.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="problem-name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="problem-name"
              type="text"
              autoComplete="off"
              disabled={disabled}
              {...register('name')}
              className={inputClass}
            />
            <FieldError message={errors.name?.message} />
          </div>

          <div>
            <span className={labelClass}>Label color</span>
            <div className="flex h-10 items-center gap-2" role="radiogroup" aria-label="Label color">
              {COLOR_PRESETS.map((color) => {
                const active = colorCode.toLowerCase() === color.toLowerCase();
                return (
                  <button
                    key={color}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={color}
                    title={color}
                    disabled={disabled}
                    onClick={() => setValue('colorCode', color, { shouldDirty: true })}
                    className={cn(
                      'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-transform',
                      active ? 'ring-2 ring-gray-900 ring-offset-2' : 'hover:scale-110',
                    )}
                    style={{ backgroundColor: color }}
                  >
                    {active && <Check size={12} strokeWidth={3} className="text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
