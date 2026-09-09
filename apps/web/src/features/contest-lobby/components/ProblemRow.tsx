import { useProblemSubmitted } from '@/features/contest-detail/hooks/useProblemSubmitted';
import type { ContestProblemSummary } from '@/features/contest/types';
import { Link } from '@tanstack/react-router';

interface ProblemRowProps {
  contestId: string;
  problem: ContestProblemSummary;
}

const STATUS_LABEL = {
  submitted: 'Submitted',
  'not-started': 'Not started',
  unknown: 'Status unknown',
} as const;

const STATUS_CLASS = {
  submitted: 'bg-green-100 text-green-700',
  'not-started': 'bg-gray-100 text-gray-500',
  unknown: 'bg-amber-100 text-amber-700',
} as const;

export default function ProblemRow({ contestId, problem }: ProblemRowProps) {
  const status = useProblemSubmitted(problem.id);
  const statusLabel = STATUS_LABEL[status];
  const statusClass = STATUS_CLASS[status];

  return (
    <tr className="bg-white transition-colors hover:bg-gray-50">
      <td className="px-5 py-4 text-sm font-medium wrap-break-word text-gray-900">{problem.name}</td>
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
