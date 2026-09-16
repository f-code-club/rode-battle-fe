import ProblemTypeBadge from '@/features/jury-dashboard/components/ProblemTypeBadge';
import type { ProblemType } from '@/features/jury-dashboard/types';
import { Check, CheckCircle2, Copy, Eye, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProblemSuccessModalProps {
  problemId: string;
  problemName: string;
  problemType: ProblemType;
  onClose: () => void;
  onCreateAnother: () => void;
  onViewDetail: (id: string) => void;
}

export default function ProblemSuccessModal({
  problemId,
  problemName,
  problemType,
  onClose,
  onCreateAnother,
  onViewDetail,
}: ProblemSuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(problemId);
      setCopied(true);
      toast.success('Problem UUID copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy UUID');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl transition-all">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 cursor-pointer rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">Problem created</h3>
          <p className="mt-1 text-xs text-gray-500">Copy the UUID to assign it to a contest.</p>

          <div className="mt-5 w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-900">{problemName}</span>
              <ProblemTypeBadge type={problemType} />
            </div>

            <div className="mt-3">
              <span className="text-[11px] font-medium text-gray-500">Problem UUID</span>
              <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-2">
                <span className="truncate font-mono text-xs font-medium text-gray-800 select-all">{problemId}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex shrink-0 cursor-pointer items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-200"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewDetail(problemId);
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-gray-800"
            >
              <Eye size={15} /> View problem
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCreateAnother();
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Plus size={15} /> Create another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
