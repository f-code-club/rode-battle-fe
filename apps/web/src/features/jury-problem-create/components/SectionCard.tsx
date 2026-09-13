import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  required?: boolean;
  hint?: string;
  actions?: ReactNode;
  children: ReactNode;
  flush?: boolean;
  className?: string;
}

export default function SectionCard({ title, required, hint, actions, children, flush, className }: SectionCardProps) {
  return (
    <section className={cn('overflow-hidden rounded-xl border border-gray-200 bg-white', className)}>
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-gray-200 px-5 py-2.5">
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {title}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </h2>
          {hint && <span className="truncate text-xs text-gray-500">{hint}</span>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <div className={flush ? undefined : 'p-5'}>{children}</div>
    </section>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}
