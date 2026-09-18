import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  History,
  Inbox,
  Loader2,
  XCircle,
} from 'lucide-react';
import { useMemo } from 'react';
import type { BackendLanguage, ProblemHistoryEntry, Verdict } from '../../../types';
import { getAlgorithmLanguageOption } from '../config/languages';

interface SubmissionHistoryPanelProps {
  history: ProblemHistoryEntry[];
  isError?: boolean;
}

interface VerdictConfig {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badgeClass: string;
}

const VERDICT_CONFIG: Record<Verdict, VerdictConfig> = {
  accepted: {
    label: 'Accepted',
    icon: CheckCircle2,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
  wrong_answer: {
    label: 'Wrong Answer',
    icon: XCircle,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
  },
  time_limit_exceeded: {
    label: 'Time Limit',
    icon: Clock,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  compilation_error: {
    label: 'Compile Error',
    icon: AlertTriangle,
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
  },
  memory_limit_exceeded: {
    label: 'Memory Limit',
    icon: AlertOctagon,
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200/80',
  },
  runtime_error: {
    label: 'Runtime Error',
    icon: AlertCircle,
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
  },
  idle_time_limit_exceeded: {
    label: 'Idle Timeout',
    icon: Clock,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
};

const PENDING_CONFIG: VerdictConfig = {
  label: 'Judging...',
  icon: Loader2,
  badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200/80 animate-pulse',
};

const UNKNOWN_CONFIG: VerdictConfig = {
  label: 'Unknown',
  icon: AlertCircle,
  badgeClass: 'bg-gray-50 text-gray-600 border-gray-200',
};

function languageLabel(language: BackendLanguage): string {
  return getAlgorithmLanguageOption(language)?.label ?? language;
}

export default function SubmissionHistoryPanel({ history, isError }: SubmissionHistoryPanelProps) {
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [history]);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <History size={15} className="text-amber-500" />
          <span className="text-xs font-bold tracking-wider text-gray-800 uppercase">Submission History</span>
        </div>
        {sortedHistory.length > 0 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-gray-600">
            {sortedHistory.length}
          </span>
        )}
      </div>

      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto p-4">
        {isError && sortedHistory.length > 0 && (
          <div className="rounded-lg bg-amber-50 p-2 font-mono text-[11px] text-amber-700">
            Failed to refresh — showing last loaded submissions.
          </div>
        )}

        {isError && sortedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1.5 py-6 text-center text-xs text-rose-500">
            <AlertCircle size={18} />
            <span>Failed to load submission history.</span>
          </div>
        ) : sortedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-gray-400">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-50 text-gray-300">
              <Inbox size={20} />
            </div>
            <span className="text-xs font-medium text-gray-500">No submissions yet</span>
            <span className="text-[11px] text-gray-400">Upload your code above to submit</span>
          </div>
        ) : (
          sortedHistory.map((entry) => {
            const config = entry.verdict ? (VERDICT_CONFIG[entry.verdict] ?? UNKNOWN_CONFIG) : PENDING_CONFIG;
            const Icon = config.icon;
            const isJudging = entry.verdict == null;

            return (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-2xs transition-colors hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-gray-800">
                      {languageLabel(entry.language)}
                    </span>
                    {entry.score != null && (
                      <span className="font-mono text-[11px] font-semibold text-amber-600">• {entry.score} pts</span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {new Date(entry.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
                >
                  <Icon size={12} className={isJudging ? 'animate-spin' : ''} />
                  <span>{config.label}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
