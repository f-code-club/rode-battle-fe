import type { ProblemSubmittedStatus } from '@/features/contest-detail/hooks/useProblemSubmitted';
import type { ContestProblemSummary } from '@/features/contest/types';
import { Link } from '@tanstack/react-router';

interface ProblemRowProps {
  contestId: string;
  problem: ContestProblemSummary;
  status: ProblemSubmittedStatus;
  label?: string;
}

const STATUS_PRESENTATION = {
  submitted: { label: 'Submitted', className: 'bg-green-100 text-green-700' },
  'not-started': { label: 'Not started', className: 'bg-gray-100 text-gray-500' },
  unknown: { label: 'Status unknown', className: 'bg-amber-100 text-amber-700' },
} as const;

export default function ProblemRow({ contestId, problem, status, label }: ProblemRowProps) {
  const { label: statusLabel, className: statusClass } = STATUS_PRESENTATION[status];

  return (
    <tr className="bg-white transition-colors hover:bg-gray-50">
      <td className="px-5 py-4 text-sm font-medium wrap-break-word text-gray-900">
        {label && <span className="mr-2 font-bold text-gray-500">{label}.</span>}
        {problem.name}
      </td>
      <td className="px-5 py-4">
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>
          {statusLabel}
        </span>
      </td>
      <td className="px-5 py-4 text-right">
        <Link
          to="/contest/$contestId/problem/$problemId"
          params={{ contestId, problemId: problem.id }}
          className="inline-block rounded-sm bg-green-700 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-800"
        >
          Làm bài
        </Link>
      </td>
    </tr>
  );
}
