import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, Maximize } from 'lucide-react';
import type { IntegrityViolation } from '../hooks/useExamIntegrity';

const VIOLATION_MESSAGE: Record<IntegrityViolation['type'], string> = {
  'tab-hidden': 'You left the problem tab.',
  'fullscreen-exit': 'You exited fullscreen.',
};

export type IntegrityWarningModalMode =
  | { kind: 'gate'; title: string }
  | { kind: 'warning'; violation: IntegrityViolation; violationCount: number };

interface IntegrityWarningModalProps {
  mode: IntegrityWarningModalMode | null;
  error: string | null;
  container: HTMLElement | null;
  onEnter: () => void;
  onAcknowledge: () => void;
}

export default function IntegrityWarningModal({
  mode,
  error,
  container,
  onEnter,
  onAcknowledge,
}: IntegrityWarningModalProps) {
  const onAction = mode?.kind === 'gate' ? onEnter : onAcknowledge;

  return (
    <Dialog.Root open={mode !== null} onOpenChange={(open) => !open && onAcknowledge()}>
      <Dialog.Portal container={container ?? undefined}>
        <Dialog.Overlay className="animate-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="animate-modal-content fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-xl focus:outline-none"
        >
          {mode?.kind === 'gate' ? (
            <>
              <div className="flex flex-col items-center gap-2 text-[#A9812D]">
                <Maximize size={20} />
                <Dialog.Title className="text-sm font-semibold text-gray-900">{mode.title}</Dialog.Title>
              </div>
              <Dialog.Description className="text-sm leading-relaxed text-gray-600">
                This problem must be attempted in fullscreen. Leaving the tab or exiting fullscreen during the attempt
                is recorded for proctor review.
              </Dialog.Description>
            </>
          ) : mode?.kind === 'warning' ? (
            <>
              <div className="flex flex-col items-center gap-2 text-amber-600">
                <AlertTriangle size={20} />
                <Dialog.Title className="text-sm font-semibold text-gray-900">Integrity warning</Dialog.Title>
              </div>
              <Dialog.Description className="text-sm leading-relaxed text-gray-600">
                {VIOLATION_MESSAGE[mode.violation.type]} This has been recorded ({mode.violationCount} total) for
                proctor review.
              </Dialog.Description>
            </>
          ) : null}

          {error && <span className="text-xs text-red-600">{error}</span>}

          <button
            type="button"
            onClick={onAction}
            className="cursor-pointer rounded-sm bg-green-700 px-6.5 py-2.5 text-xs font-semibold tracking-[0.02em] text-white transition-colors hover:bg-[#256532]"
          >
            {mode?.kind === 'gate' ? 'Enter fullscreen & start' : 'Back to the problem'}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
