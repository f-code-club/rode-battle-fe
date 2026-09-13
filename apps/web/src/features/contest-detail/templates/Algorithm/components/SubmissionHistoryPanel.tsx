import { useMemo } from 'react';
import type { BackendLanguage, ProblemHistoryEntry, Verdict } from '../../../types';
import { getAlgorithmLanguageOption } from '../config/languages';

interface SubmissionHistoryPanelProps {
  history: ProblemHistoryEntry[];
  isError?: boolean;
}

interface VerdictPresentation {
  label: string;
  className: string;
}

const VERDICT_PRESENTATION: Record<Verdict, VerdictPresentation> = {
  accepted: { label: 'Accepted', className: 'bg-green-100 text-green-700' },
  wrong_answer: { label: 'Wrong Answer', className: 'bg-red-100 text-red-700' },
  time_limit_exceeded: { label: 'Time Limit', className: 'bg-amber-100 text-amber-700' },
  compilation_error: { label: 'Compile Error', className: 'bg-red-100 text-red-700' },
  memory_limit_exceeded: { label: 'Memory Limit', className: 'bg-amber-100 text-amber-700' },
  runtime_error: { label: 'Runtime Error', className: 'bg-red-100 text-red-700' },
  idle_time_limit_exceeded: { label: 'Idle Time Limit', className: 'bg-amber-100 text-amber-700' },
};

const PENDING_PRESENTATION: VerdictPresentation = {
  label: 'Judging...',
  className: 'bg-amber-100 text-amber-700 animate-pulse font-semibold',
};
const UNKNOWN_PRESENTATION: VerdictPresentation = { label: 'Unknown', className: 'bg-gray-100 text-gray-600' };

function languageLabel(language: BackendLanguage): string {
  return getAlgorithmLanguageOption(language)?.label ?? language;
}

export default function SubmissionHistoryPanel({ history, isError }: SubmissionHistoryPanelProps) {
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [history]);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Submission History</span>
      </div>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto p-5">
        {isError && sortedHistory.length > 0 && (
          <div className="font-mono text-[11px] text-red-500">Failed to refresh — showing last loaded submissions.</div>
        )}
        {isError && sortedHistory.length === 0 ? (
          <div className="font-mono text-xs text-red-500">Failed to load submission history.</div>
        ) : sortedHistory.length === 0 ? (
          <div className="font-mono text-xs text-gray-400">No submissions yet</div>
        ) : (
          sortedHistory.map((entry) => {
            const presentation = entry.verdict
              ? (VERDICT_PRESENTATION[entry.verdict] ?? UNKNOWN_PRESENTATION)
              : PENDING_PRESENTATION;
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-xs border border-gray-200 px-3 py-1.75 text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-gray-700">{languageLabel(entry.language)}</span>
                  <span className="text-gray-400">
                    {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span className={`rounded-xs px-2 py-0.5 font-mono ${presentation.className}`}>
                  {presentation.label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
