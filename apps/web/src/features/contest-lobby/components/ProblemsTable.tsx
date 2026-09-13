import {
  type ProblemSubmittedStatus,
  resolveProblemSubmittedStatus,
} from '@/features/contest-detail/hooks/useProblemSubmitted';
import { problemKeys } from '@/features/contest-detail/queryKeys';
import { problemService } from '@/features/contest-detail/services/problem.service';
import type { ContestProblemSummary } from '@/features/contest/types';
import { problemLabel } from '@/features/contest/utils';
import { useQueries } from '@tanstack/react-query';
import ProblemRow from './ProblemRow';

interface ProblemsTableProps {
  contestId: string;
  problems: ContestProblemSummary[];
}

export default function ProblemsTable({ contestId, problems }: ProblemsTableProps) {
  const historyQueries = useQueries({
    queries: problems.map((problem) => ({
      queryKey: problemKeys.history(problem.id),
      queryFn: ({ signal }: { signal?: AbortSignal }) => problemService.getHistory(problem.id, signal),
      staleTime: 30_000,
    })),
  });

  const getStatus = (index: number): ProblemSubmittedStatus => {
    const q = historyQueries[index];
    return resolveProblemSubmittedStatus(q?.data, q?.isSuccess);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100 text-left text-xs tracking-wider uppercase">
            <th className="px-5 py-3 font-medium">Problem</th>
            <th className="w-40 px-5 py-3 font-medium">Status</th>
            <th className="w-32 px-5 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {problems.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-5 py-8 text-center text-sm text-gray-400">
                Chưa có bài thi nào trong cuộc thi này.
              </td>
            </tr>
          ) : (
            problems.map((problem, index) => (
              <ProblemRow
                key={problem.id}
                contestId={contestId}
                problem={problem}
                status={getStatus(index)}
                label={problemLabel(index)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
