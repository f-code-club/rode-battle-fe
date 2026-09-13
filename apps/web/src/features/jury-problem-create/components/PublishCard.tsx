import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProblemTypeBadge from '@/features/jury-dashboard/components/ProblemTypeBadge';
import type { ProblemType } from '@/features/jury-dashboard/types';
import { LANGUAGE_LABELS, PROBLEM_TYPE_LABELS } from '@/features/jury-dashboard/utils/problem';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { ALGO_LANGUAGES } from '../constants';
import type { ProblemFormData } from '../schemas/problem.schema';

interface PublishCardProps {
  form: UseFormReturn<ProblemFormData>;
  problemType: ProblemType;
  isSubmitting: boolean;
  onConfirmedSubmit: () => void;
}

interface CheckItem {
  label: string;
  done: boolean;
  detail?: string;
}

export default function PublishCard({ form, problemType, isSubmitting, onConfirmedSubmit }: PublishCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, colorCode, base64, statement, languages, timeLimit, memoryLimit, checkerCode, checkerLanguage] =
    useWatch({
      control: form.control,
      name: [
        'name',
        'colorCode',
        'base64Content',
        'statement',
        'languages',
        'timeLimit',
        'memoryLimit',
        'checkerCode',
        'checkerLanguage',
      ],
    });

  const isCss = problemType === 'CSS_BATTLE';
  const algoLangs = ALGO_LANGUAGES.filter((l) => languages?.includes(l.id)).map((l) => l.id);
  const hasLimits = timeLimit != null && !Number.isNaN(timeLimit) && memoryLimit != null && !Number.isNaN(memoryLimit);

  const checks: CheckItem[] = [
    { label: 'Name', done: (name?.trim().length ?? 0) >= 2, detail: name?.trim() || undefined },
    ...(isCss
      ? [{ label: 'Target image', done: Boolean(base64) }]
      : [
          { label: 'Statement', done: (statement?.trim().length ?? 0) >= 10 },
          {
            label: 'Limits',
            done: hasLimits,
            detail: hasLimits ? `${timeLimit} ms · ${memoryLimit} MB` : undefined,
          },
          {
            label: 'Languages',
            done: algoLangs.length > 0,
            detail: algoLangs.length ? algoLangs.map((l) => LANGUAGE_LABELS[l]).join(', ') : undefined,
          },
          {
            label: 'Checker',
            done: (checkerCode?.trim().length ?? 0) >= 10,
            detail: checkerCode?.trim() && checkerLanguage ? LANGUAGE_LABELS[checkerLanguage] : undefined,
          },
        ]),
  ];

  const handleCreateClick = async () => {
    const valid = await form.trigger();
    if (valid) setShowConfirm(true);
  };

  return (
    <>
      <div className="sticky top-24 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: colorCode || '#9ca3af' }} />
          <span className="truncate text-sm font-semibold text-gray-900">{name?.trim() || 'Untitled problem'}</span>
          <ProblemTypeBadge type={problemType} className="ml-auto" />
        </div>

        <ul className="space-y-2.5 px-5 py-4">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2.5 text-xs">
              <span
                className={cn(
                  'mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                  c.done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300 bg-white',
                )}
              >
                {c.done && <Check size={10} strokeWidth={3} />}
              </span>
              <span className="min-w-0">
                <span className={cn('font-medium', c.done ? 'text-gray-900' : 'text-gray-500')}>{c.label}</span>
                {c.detail && <span className="block truncate text-gray-500">{c.detail}</span>}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleCreateClick}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? 'Creating…' : 'Create problem'}
          </button>
          <Link
            to="/jury"
            className="flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          onConfirmedSubmit();
        }}
        title="Create this problem?"
        confirmLabel="Create"
      >
        <p>
          <strong>{name?.trim()}</strong> ({PROBLEM_TYPE_LABELS[problemType]}) will be created.
        </p>
      </ConfirmDialog>
    </>
  );
}
