import type { ProblemHistoryEntry, Verdict } from '../../../types';

interface SubmissionHistoryPanelProps {
  history: ProblemHistoryEntry[];
}

const VERDICT_LABEL: Record<Verdict, string> = {
  accepted: 'Accepted',
  wrong_answer: 'Wrong Answer',
  time_limit_exceeded: 'Time Limit',
  compilation_error: 'Compile Error',
  memory_limit_exceeded: 'Memory Limit',
  runtime_error: 'Runtime Error',
  idle_time_limit_exceeded: 'Idle Time Limit',
};

const VERDICT_CLASS: Record<Verdict, string> = {
  accepted: 'bg-green-100 text-green-700',
  wrong_answer: 'bg-red-100 text-red-700',
  time_limit_exceeded: 'bg-amber-100 text-amber-700',
  compilation_error: 'bg-red-100 text-red-700',
  memory_limit_exceeded: 'bg-amber-100 text-amber-700',
  runtime_error: 'bg-red-100 text-red-700',
  idle_time_limit_exceeded: 'bg-amber-100 text-amber-700',
};

export default function SubmissionHistoryPanel({ history }: SubmissionHistoryPanelProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center border-b border-gray-200 px-5 py-3.5">
        <span className="text-xs font-semibold tracking-[0.03em] text-gray-700 uppercase">Submission History</span>
      </div>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto p-5">
        {history.length === 0 ? (
          <div className="font-mono text-xs text-gray-400">No submissions yet</div>
        ) : (
          history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-xs border border-gray-200 px-3 py-1.75 text-xs"
            >
              <div className="flex flex-col">
                <span className="font-mono text-gray-700">{entry.language}</span>
                <span className="text-gray-400">
                  {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span
                className={`rounded-xs px-2 py-0.5 font-mono ${entry.verdict ? VERDICT_CLASS[entry.verdict] : 'bg-gray-100 text-gray-600'}`}
              >
                {entry.verdict ? VERDICT_LABEL[entry.verdict] : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
