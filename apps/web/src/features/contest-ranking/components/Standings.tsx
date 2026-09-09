import type { Ranking } from '@/features/contest/types';
import { cn } from '@/lib/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Penalty from './Penalty';
import Problem from './Problem';
import Score from './Score';

interface StandingsProps {
  rankings: Ranking[];
  problemLabels: string[];
  currentTeam?: string;
}

export default function Standings({ rankings, problemLabels, currentTeam }: StandingsProps) {
  const [tbodyRef] = useAutoAnimate<HTMLTableSectionElement>({
    duration: 350,
    easing: 'ease-in-out',
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/70">
            <th className="px-3 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">#</th>
            <th className="py-3 pr-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Team</th>
            <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Score
            </th>
            <th className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Penalty
            </th>
            {problemLabels.map((label) => (
              <th
                key={label}
                className="px-3 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          ref={(el) => {
            if (el) tbodyRef(el);
          }}
        >
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
                    'text-sm',
                    index === 0
                      ? 'font-black text-amber-500'
                      : index === 1
                        ? 'font-black text-slate-400'
                        : index === 2
                          ? 'font-black text-orange-500'
                          : 'font-semibold text-gray-300',
                  )}
                >
                  {index + 1}
                </span>
              </td>
              <td className="py-4 pr-4">
                <span className="font-semibold text-gray-900">{entry.name}</span>
              </td>
              <td className="px-3 py-4 text-center">
                <Score score={entry.score} />
              </td>
              <td className="px-3 py-4 text-center">
                <Penalty penalty={entry.penalty} />
              </td>
              {problemLabels.map((label, problemIndex) => {
                const detail = entry.details.find((d) => d.problem_position === problemIndex + 1);
                return (
                  <td key={label} className="px-3 py-4 text-center">
                    <Problem score={detail?.score ?? 0} submissionCount={detail?.submission_count ?? 0} />
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
