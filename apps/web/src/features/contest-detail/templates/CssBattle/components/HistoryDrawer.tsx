import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { ProblemHistoryEntry } from '../../../types';
import type { PageColors } from '../config/editorThemes';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  history: ProblemHistoryEntry[];
  isError?: boolean;
  colors: PageColors;
}

function scorePresentation(entry: ProblemHistoryEntry): { label: string; tone: 'pending' | 'scored' | 'unknown' } {
  if (entry.score != null && !Number.isNaN(entry.score)) {
    return { label: `${Math.round(entry.score)}%`, tone: 'scored' };
  }
  if (entry.verdict == null) {
    return { label: 'Judging...', tone: 'pending' };
  }
  return { label: entry.verdict, tone: 'unknown' };
}

export default function HistoryDrawer({ open, onClose, history, isError, colors }: HistoryDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity motion-reduce:transition-none ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Submission history"
        style={{ backgroundColor: colors.background, color: colors.foreground, borderColor: colors.border }}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l shadow-2xl transition-transform duration-300 motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div style={{ borderColor: colors.border }} className="flex items-center justify-between border-b px-5 py-4">
          <span className="text-sm font-semibold tracking-[0.02em] uppercase opacity-90">Submission History</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close submission history"
            style={{ color: colors.foreground }}
            className="cursor-pointer rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-5">
          {isError && sortedHistory.length > 0 && (
            <div className="font-mono text-xs opacity-70">Failed to refresh — showing last loaded submissions.</div>
          )}
          {isError && sortedHistory.length === 0 ? (
            <div className="font-mono text-xs opacity-70">Failed to load submission history.</div>
          ) : sortedHistory.length === 0 ? (
            <div className="font-mono text-xs opacity-50">No submissions yet</div>
          ) : (
            sortedHistory.map((entry) => {
              const presentation = scorePresentation(entry);
              return (
                <div
                  key={entry.id}
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                  className="flex items-center justify-between rounded-sm border px-3 py-2 text-xs"
                >
                  <span className="opacity-70">
                    {new Date(entry.created_at).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span
                    className={`rounded-xs px-2 py-0.5 font-mono ${
                      presentation.tone === 'pending' ? 'animate-pulse font-semibold text-amber-400' : ''
                    }`}
                    style={presentation.tone === 'scored' ? { color: '#4ade80' } : undefined}
                  >
                    {presentation.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
