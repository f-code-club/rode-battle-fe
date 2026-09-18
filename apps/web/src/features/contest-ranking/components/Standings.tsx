import type { Ranking } from '@/features/contest/types';
import { cn } from '@/lib/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Crown, Medal, Trophy } from 'lucide-react';
import { useMemo } from 'react';
import Penalty from './Penalty';
import Problem from './Problem';
import Score from './Score';

export interface ProblemColumn {
  position: number;
  label: string;
}

interface StandingsProps {
  rankings: Ranking[];
  problemColumns: ProblemColumn[];
  currentTeam?: string;
}

export default function Standings({ rankings, problemColumns, currentTeam }: StandingsProps) {
  const [tbodyRef] = useAutoAnimate<HTMLTableSectionElement>({
    duration: 350,
    easing: 'ease-in-out',
  });

  const problemStats = useMemo(() => {
    return problemColumns.map((col) => {
      let solves = 0;
      let attempts = 0;
      for (const r of rankings) {
        const d = r.details?.find((item) => item.problem_position === col.position);
        if (d) {
          if (d.score > 0) solves++;
          attempts += d.submission_count;
        }
      }
      return {
        position: col.position,
        solves,
        attempts,
      };
    });
  }, [rankings, problemColumns]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200/90 bg-slate-900 text-white">
              <th className="w-16 px-4 py-3.5 text-center text-xs font-bold tracking-wider uppercase">#</th>
              <th className="min-w-45 px-4 py-3.5 text-left text-xs font-bold tracking-wider uppercase">Team Name</th>
              <th className="w-24 px-4 py-3.5 text-center text-xs font-bold tracking-wider uppercase">Score</th>
              <th className="w-24 px-4 py-3.5 text-center text-xs font-bold tracking-wider uppercase">Penalty</th>

              {problemColumns.map((column, idx) => {
                const stat = problemStats[idx];
                return (
                  <th
                    key={column.position}
                    className="min-w-16.25 px-2 py-3 text-center transition-colors hover:bg-slate-800"
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-sm font-black text-amber-400">{column.label}</span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {stat ? `${stat.solves}/${rankings.length}` : '—'}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody
            ref={(el) => {
              if (el) tbodyRef(el);
            }}
            className="divide-y divide-gray-100"
          >
            {rankings.length === 0 ? (
              <tr>
                <td colSpan={4 + problemColumns.length} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Trophy className="size-8 text-gray-300" />
                    <p className="text-sm font-semibold text-gray-700">Chưa có dữ liệu bảng xếp hạng.</p>
                  </div>
                </td>
              </tr>
            ) : (
              rankings.map((entry, index) => {
                const trueRank = index + 1;
                const isUser = currentTeam && entry.name.toLowerCase() === currentTeam.toLowerCase();

                return (
                  <tr
                    key={entry.name}
                    className={cn(
                      'transition-all duration-200 hover:bg-slate-50/80',
                      trueRank === 1 && 'bg-amber-50/40 hover:bg-amber-50/70',
                      isUser &&
                        'bg-emerald-50/50 font-medium ring-2 ring-emerald-500/40 ring-inset hover:bg-emerald-50/80',
                    )}
                  >
                    <td className="px-4 py-3.5 text-center">
                      {trueRank === 1 ? (
                        <div className="flex items-center justify-center" title="1st Place - Champion">
                          <span className="flex size-7 items-center justify-center rounded-full bg-linear-to-b from-amber-300 to-amber-500 font-bold text-slate-900 shadow-xs">
                            <Crown size={14} className="fill-slate-900" />
                          </span>
                        </div>
                      ) : trueRank === 2 ? (
                        <div className="flex items-center justify-center" title="2nd Place">
                          <span className="flex size-7 items-center justify-center rounded-full bg-linear-to-b from-slate-200 to-slate-400 font-bold text-slate-900 shadow-xs">
                            <Medal size={14} />
                          </span>
                        </div>
                      ) : trueRank === 3 ? (
                        <div className="flex items-center justify-center" title="3rd Place">
                          <span className="flex size-7 items-center justify-center rounded-full bg-linear-to-b from-amber-600 to-amber-700 font-bold text-white shadow-xs">
                            <Medal size={14} />
                          </span>
                        </div>
                      ) : (
                        <span className="font-mono text-xs font-bold text-gray-500">{trueRank}</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-gray-200/80 bg-gray-100 font-mono text-xs font-bold text-gray-700 uppercase">
                          {entry.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-900">{entry.name}</span>
                            {isUser && (
                              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <Score score={entry.score} />
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <Penalty penalty={entry.penalty} />
                    </td>

                    {problemColumns.map((column) => {
                      const detail = entry.details?.find((d) => d.problem_position === column.position);

                      return (
                        <td key={column.position} className="px-1.5 py-3 text-center">
                          <Problem
                            score={detail?.score ?? 0}
                            submissionCount={detail?.submission_count ?? 0}
                            lastSubmit={detail?.last_submit}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>

          {rankings.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50/90 font-mono text-xs text-gray-600">
                <td colSpan={4} className="px-4 py-3 text-right font-bold tracking-wide text-gray-700 uppercase">
                  Solved / Attempts
                </td>
                {problemStats.map((stat) => (
                  <td key={stat.position} className="px-2 py-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-emerald-700">{stat.solves}</span>
                      <span className="text-[10px] text-gray-400">/{stat.attempts}</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
