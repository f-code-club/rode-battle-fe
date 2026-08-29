import { cn } from '@/lib/utils';
import type { Role as RoleType } from '../types';

const ROLE_CONFIG: Record<RoleType, { label: string; className: string }> = {
  admin: { label: 'Admin', className: 'border-red-200 bg-red-50 text-red-700' },
  jury: { label: 'Jury', className: 'border-yellow-200 bg-yellow-50 text-yellow-800' },
  participant: { label: 'Participant', className: 'border-green-200 bg-green-50 text-green-700' },
};

export default function Role({ role }: { role: RoleType }) {
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.participant;

  return (
    <span
      className={cn('inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium', config.className)}
    >
      {config.label}
    </span>
  );
}
