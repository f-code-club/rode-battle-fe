import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, X } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import { useAddAccount } from '../hooks/useAddAccount';
import { ROLES } from '../types';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const inputClass =
  'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 shadow-2xs transition-all placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none';

export default function AddUserDialog({ open, onOpenChange, onCreated }: AddUserDialogProps) {
  const {
    form: {
      register,
      control,
      formState: { errors, isSubmitting },
    },
    onSubmit,
    reset,
  } = useAddAccount(() => {
    onCreated();
    onOpenChange(false);
  });

  const selectedRole = useWatch({ control, name: 'role' });

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-modal-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="animate-modal-content fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl focus:outline-none"
        >
          <form onSubmit={onSubmit} noValidate>
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
              <div>
                <Dialog.Title className="text-lg font-bold tracking-tight text-gray-900">Add user</Dialog.Title>
              </div>
              <Dialog.Close
                aria-label="Close"
                className="shrink-0 cursor-pointer rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4 px-5 py-5">
              {errors.root && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                  {errors.root.message}
                </div>
              )}

              <div>
                <label htmlFor="add-user-name" className="mb-1.5 block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  id="add-user-name"
                  placeholder="Full name"
                  {...register('name')}
                  className={cn(inputClass, errors.name && 'border-red-300 focus:border-red-500 focus:ring-red-500')}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="add-user-email" className="mb-1.5 block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="add-user-email"
                  type="email"
                  autoComplete="off"
                  placeholder="example@gmail.com"
                  {...register('email')}
                  className={cn(inputClass, errors.email && 'border-red-300 focus:border-red-500 focus:ring-red-500')}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-gray-900">Role</span>
                <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                  {ROLES.map((role) => (
                    <label
                      key={role}
                      className={cn(
                        'flex-1 cursor-pointer rounded-md px-3 py-1.5 text-center text-xs font-medium capitalize transition-colors',
                        selectedRole === role
                          ? 'bg-gray-900 text-white shadow-2xs'
                          : 'text-gray-600 hover:bg-white hover:text-gray-900',
                      )}
                    >
                      <input type="radio" value={role} {...register('role')} className="sr-only" />
                      {role}
                    </label>
                  ))}
                </div>
                {errors.role && <p className="mt-1.5 text-xs text-red-500">{errors.role.message}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-5 py-3.5">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="h-9 cursor-pointer rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-black px-4 text-xs font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {isSubmitting ? 'Creating...' : 'Create user'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
