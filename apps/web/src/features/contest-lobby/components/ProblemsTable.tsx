import type { ContestProblemSummary } from '@/features/contest/data';
import ProblemRow from './ProblemRow';

interface ProblemsTableProps {
  contestId: string;
  problems: ContestProblemSummary[];
}

export default function ProblemsTable({ contestId, problems }: ProblemsTableProps) {
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
          {problems.map((problem) => (
            <ProblemRow key={problem.id} contestId={contestId} problem={problem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
