import { cn } from '@/lib/utils';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  const confirmButtonClass =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500';

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={loading ? undefined : onClose}
        onKeyDown={undefined}
        role="presentation"
      />

      <div className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-40"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
              variant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600',
            )}
          >
            <AlertTriangle size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <div className="mt-1.5 text-xs leading-relaxed text-gray-600">{children}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 items-center rounded-lg border border-gray-200 px-4 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'flex h-9 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-60',
              confirmButtonClass,
            )}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
