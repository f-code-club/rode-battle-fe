import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, X } from 'lucide-react';
import type { Account } from '../types';

interface ImportPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
  onConfirm: (accounts: Account[]) => void;
  isSubmitting?: boolean;
}

export default function ImportPreview({
  open,
  onOpenChange,
  accounts,
  onConfirm,
  isSubmitting = false,
}: ImportPreviewProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="animate-modal-content fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl focus:outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
            <div>
              <Dialog.Title className="text-lg font-bold tracking-tight text-gray-900">
                Preview imported accounts
              </Dialog.Title>
              <p className="mt-0.5 text-xs text-gray-500">
                {accounts.length} account{accounts.length !== 1 ? 's' : ''} will be created
              </p>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="shrink-0 cursor-pointer rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="max-h-80 overflow-y-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-5 py-2.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-5 py-2.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-5 py-2.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accounts.map((account, index) => (
                  <tr key={`${account.email}-${index}`} className="transition-colors hover:bg-gray-50/60">
                    <td className="px-5 py-2.5 text-xs font-medium text-gray-400">{index + 1}</td>
                    <td className="px-5 py-2.5 text-sm font-medium text-gray-900">{account.name}</td>
                    <td className="px-5 py-2.5 text-sm text-gray-600">{account.email}</td>
                    <td className="px-5 py-2.5">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 capitalize">
                        {account.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-5 py-3.5">
            <Dialog.Close asChild>
              <button
                type="button"
                className="h-9 cursor-pointer rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              type="button"
              disabled={isSubmitting || accounts.length === 0}
              onClick={() => onConfirm(accounts)}
              className="flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-black px-4 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isSubmitting ? 'Creating...' : `Create ${accounts.length} accounts`}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
