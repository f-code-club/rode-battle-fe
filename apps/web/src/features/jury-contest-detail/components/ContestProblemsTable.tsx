import type { ContestProblem } from '@/features/jury-dashboard/types';
import { Link, useNavigate } from '@tanstack/react-router';
import { Eye } from 'lucide-react';

const POSITION_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ContestProblemsTableProps {
  problems: ContestProblem[];
}

export default function ContestProblemsTable({ problems }: ContestProblemsTableProps) {
  const navigate = useNavigate();

  if (problems.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xs">
        <h3 className="text-sm font-semibold text-gray-900">Problems</h3>
        <p className="mt-3 py-6 text-center text-xs text-gray-400">No problems assigned</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Problems
          <span className="ml-2 text-xs font-normal text-gray-400">{problems.length}</span>
        </h3>
      </div>

      <table className="w-full text-left text-xs text-gray-600">
        <thead className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
          <tr>
            <th scope="col" className="w-16 px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="w-20 px-6 py-3 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {problems
            .sort((a, b) => a.position - b.position)
            .map((problem) => (
              <tr
                key={problem.id}
                onClick={() =>
                  navigate({
                    to: '/jury/problems/$problemId',
                    params: { problemId: problem.id },
                  })
                }
                className="cursor-pointer transition-colors hover:bg-gray-50/80"
              >
                <td className="px-6 py-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-[11px] font-bold text-gray-700">
                    {POSITION_LABELS[problem.position - 1] ?? problem.position}
                  </span>
                </td>
                <td className="px-6 py-3 font-medium text-gray-900">{problem.name}</td>
                <td className="px-6 py-3 text-right">
                  <Link
                    to="/jury/problems/$problemId"
                    params={{ problemId: problem.id }}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                    title="View problem"
                  >
                    <Eye size={14} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
