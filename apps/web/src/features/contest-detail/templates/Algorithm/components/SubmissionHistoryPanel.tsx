import type { SubmissionRecord } from '../hooks/useSubmissionHistory';

interface SubmissionHistoryPanelProps {
  history: SubmissionRecord[];
}

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
          history.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between rounded-xs border border-gray-200 px-3 py-1.75 text-xs"
            >
              <div className="flex flex-col">
                <span className="font-mono text-gray-700">{record.fileName}</span>
                <span className="text-gray-400">
                  {new Date(record.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ·{' '}
                  {record.languageLabel}
                </span>
              </div>
              <span className="rounded-xs bg-gray-100 px-2 py-0.5 font-mono text-gray-600">{record.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
