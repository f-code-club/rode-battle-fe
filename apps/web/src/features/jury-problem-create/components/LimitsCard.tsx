import { LANGUAGE_LABELS } from '@/features/jury-dashboard/utils/problem';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { ALGO_LANGUAGES, labelClass, type AlgoLanguage } from '../constants';
import type { ProblemFormData } from '../schemas/problem.schema';
import SectionCard, { FieldError } from './SectionCard';

interface LimitsCardProps {
  form: UseFormReturn<ProblemFormData>;
  disabled?: boolean;
}

const numberInputClass =
  'h-10 w-full bg-transparent px-3 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:text-gray-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

const unitBoxClass =
  'flex h-10 items-center overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600';

const toOptionalNumber = (v: unknown) => (v === '' || v == null ? undefined : Number(v));

const formatSeconds = (ms: number | undefined) =>
  ms != null && Number.isFinite(ms) && ms > 0 ? `= ${(ms / 1000).toFixed(ms % 1000 === 0 ? 0 : 1)} s` : '';

export default function LimitsCard({ form, disabled }: LimitsCardProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const timeLimit = useWatch({ control: form.control, name: 'timeLimit' });
  const languages = useWatch({ control: form.control, name: 'languages' }) ?? [];
  const selected = ALGO_LANGUAGES.filter((l) => languages.includes(l.id)).map((l) => l.id);

  const toggleLanguage = (lang: AlgoLanguage) => {
    const next = selected.includes(lang) ? selected.filter((l) => l !== lang) : [...selected, lang];
    setValue('languages', next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <SectionCard title="Limits & languages">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="time-limit" className={labelClass}>
            Time limit per test <span className="text-red-500">*</span>
          </label>
          <div className={unitBoxClass}>
            <input
              id="time-limit"
              type="number"
              min={100}
              max={15000}
              step={100}
              disabled={disabled}
              placeholder="1000"
              {...register('timeLimit', { setValueAs: toOptionalNumber })}
              className={numberInputClass}
            />
            <span className="flex h-full items-center border-l border-gray-200 bg-gray-50 px-3 font-mono text-xs text-gray-500 select-none">
              ms
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
            <FieldError message={errors.timeLimit?.message} />
            <span className="ml-auto font-mono">{formatSeconds(timeLimit)}</span>
          </div>
        </div>

        <div>
          <label htmlFor="memory-limit" className={labelClass}>
            Memory limit per test <span className="text-red-500">*</span>
          </label>
          <div className={unitBoxClass}>
            <input
              id="memory-limit"
              type="number"
              min={16}
              max={2048}
              step={16}
              disabled={disabled}
              placeholder="256"
              {...register('memoryLimit', { setValueAs: toOptionalNumber })}
              className={numberInputClass}
            />
            <span className="flex h-full items-center border-l border-gray-200 bg-gray-50 px-3 font-mono text-xs text-gray-500 select-none">
              MB
            </span>
          </div>
          <FieldError message={errors.memoryLimit?.message} />
        </div>
      </div>

      <div className="mt-5">
        <span className={labelClass}>
          Allowed languages <span className="text-red-500">*</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {ALGO_LANGUAGES.map((lang) => {
            const active = selected.includes(lang.id);
            return (
              <button
                key={lang.id}
                type="button"
                role="checkbox"
                aria-checked={active}
                disabled={disabled}
                onClick={() => toggleLanguage(lang.id)}
                className={cn(
                  'flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm transition-colors',
                  active
                    ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-900'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
                )}
              >
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded border',
                    active ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300 bg-white',
                  )}
                >
                  {active && <Check size={11} strokeWidth={3} />}
                </span>
                {LANGUAGE_LABELS[lang.id]}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.languages?.message} />
      </div>
    </SectionCard>
  );
}
