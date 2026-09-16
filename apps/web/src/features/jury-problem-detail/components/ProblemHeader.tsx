import type { ProblemDetailResponse } from '@/features/jury-dashboard/types';
import { getProblemType, LANGUAGE_LABELS, PROBLEM_TYPE_LABELS } from '@/features/jury-dashboard/utils/problem';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProblemHeaderProps {
  problemId: string;
  problem: ProblemDetailResponse;
}

const formatTimeLimit = (ms: number) =>
  `${Number.isInteger(ms / 1000) ? ms / 1000 : (ms / 1000).toFixed(1)} second${ms === 1000 ? '' : 's'}`;

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="inline">{label}: </dt>
      <dd className="inline font-medium text-gray-900">{value}</dd>
    </div>
  );
}

export default function ProblemHeader({ problemId, problem }: ProblemHeaderProps) {
  const [copied, setCopied] = useState(false);
  const isCss = getProblemType(problem.languages) === 'CSS_BATTLE';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(problemId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <header className="border-b border-gray-200 pb-5 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {problem.color_code && (
          <span
            className="mr-2 inline-block h-3 w-3 rounded-full align-middle"
            style={{ backgroundColor: problem.color_code }}
          />
        )}
        {problem.name}
      </h1>

      <dl className="mt-4 space-y-1 text-base text-gray-600">
        {isCss ? (
          <MetaRow label="Type" value={PROBLEM_TYPE_LABELS.CSS_BATTLE} />
        ) : (
          <>
            {problem.time_limit != null && (
              <MetaRow label="Time limit per test" value={formatTimeLimit(problem.time_limit)} />
            )}
            {problem.memory_limit != null && (
              <MetaRow label="Memory limit per test" value={`${problem.memory_limit} megabytes`} />
            )}
            <MetaRow label="Languages" value={problem.languages.map((l) => LANGUAGE_LABELS[l] ?? l).join(', ')} />
          </>
        )}
      </dl>

      <button
        type="button"
        onClick={handleCopy}
        title="Copy problem UUID"
        className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-gray-400 hover:bg-gray-100 hover:text-gray-700"
      >
        {problemId}
        {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
      </button>
    </header>
  );
}
