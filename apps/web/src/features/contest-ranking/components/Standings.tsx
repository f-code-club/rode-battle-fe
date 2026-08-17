import { cn } from '@/lib/utils';
import type { Ranking } from '../types';

interface StandingsProps {
  rankings: Ranking[];
  problemLabels: string[];
  currentTeam?: string;
}

function ProblemCell({ score, submissionCount }: { score: number; submissionCount: number }) {
  if (submissionCount === 0) {
    return <span className="text-gray-300">—</span>;
  }

  const isAccepted = score > 0;

  return (
    <div className="flex flex-col items-center">
      <span className={cn('text-sm font-semibold', isAccepted ? 'text-green-600' : 'text-red-500')}>
        {isAccepted ? '+' : '-'}
        {submissionCount}
      </span>
    </div>
  );
}

export default function Standings({ rankings, problemLabels, currentTeam }: StandingsProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-100">
            <th className="px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">#</th>
            <th className="py-3 pr-4 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">Team</th>
            <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Score
            </th>
            <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Penalty
            </th>
            {problemLabels.map((label) => (
              <th
                key={label}
                className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-400 uppercase"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rankings.map((entry, index) => (
            <tr
              key={entry.name}
              className={cn(
                'border-b border-gray-50 transition-colors hover:bg-gray-50/50',
                (currentTeam ? entry.name === currentTeam : index === 0) && 'bg-amber-100/80',
              )}
            >
              <td className="px-3 py-4 text-left">
                <span
                  className={cn(
                    'text-sm font-bold',
                    index === 0
                      ? 'text-amber-500'
                      : index === 1
                        ? 'text-gray-400'
                        : index === 2
                          ? 'text-amber-700'
                          : 'text-gray-300',
                  )}
                >
                  {index + 1}
                </span>
              </td>
              <td className="py-4 pr-4">
                <span className="font-semibold text-gray-900">{entry.name}</span>
              </td>
              <td className="px-3 py-4 text-center font-bold text-gray-900">{entry.score}</td>
              <td className="px-3 py-4 text-center text-gray-500">{entry.penalty}</td>
              {problemLabels.map((label, problemIndex) => {
                const detail = entry.details.find((d) => d.problem_position === problemIndex + 1);
                return (
                  <td key={label} className="px-3 py-4 text-center">
                    <ProblemCell score={detail?.score ?? 0} submissionCount={detail?.submission_count ?? 0} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
