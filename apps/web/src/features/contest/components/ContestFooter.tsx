import { useAuthContext } from '@/features/auth/context/AuthContext';
import { isStaffRole } from '@/features/auth/utils';
import type { PageColors } from '@/features/contest-detail/templates/CssBattle/config/editorThemes';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

interface ContestFooterProps {
  backTo: string;
  backLabel: string;
  contestId?: string;
  colors: Pick<PageColors, 'foreground'>;
}

export default function ContestFooter({ backTo, backLabel, contestId, colors }: ContestFooterProps) {
  const { user } = useAuthContext();
  const isStaff = isStaffRole(user?.role);

  return (
    <div
      style={{ color: colors.foreground }}
      className="grid shrink-0 grid-cols-3 items-center gap-x-4 px-7 py-3.5 text-xs"
    >
      <Link
        to={backTo}
        style={{ color: colors.foreground }}
        className="flex items-center gap-1 justify-self-start opacity-70 transition-opacity hover:opacity-100"
        aria-label={backLabel}
      >
        <ArrowLeft size={14} />
        {backLabel}
      </Link>

      <span className="justify-self-center tracking-[0.02em]">© 2026 R.ODE Battle</span>

      {isStaff && (
        <div className="flex gap-5 justify-self-end">
          {contestId ? (
            <Link
              to="/contest/$contestId/rank"
              params={{ contestId }}
              className="text-orange-500 no-underline hover:underline"
            >
              Leaderboard
            </Link>
          ) : (
            <span className="text-orange-500 opacity-70">Leaderboard</span>
          )}
        </div>
      )}
    </div>
  );
}
