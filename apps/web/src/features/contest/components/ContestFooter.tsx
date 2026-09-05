import type { PageColors } from '@/features/contest-detail/templates/CssBattle/config/editorThemes';
import { ArrowLeft } from 'lucide-react';

const FOOTER_LINKS = ['Rules', 'Leaderboard', 'Support'];

interface ContestFooterProps {
  backTo: string;
  backLabel: string;
  colors: Pick<PageColors, 'foreground'>;
}

export default function ContestFooter({ backTo, backLabel, colors }: ContestFooterProps) {
  return (
    <div
      style={{ color: colors.foreground }}
      className="flex shrink-0 items-center justify-between gap-x-4 px-7 py-3.5 text-xs"
    >
      <a
        href={backTo}
        style={{ color: colors.foreground }}
        className="flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100"
        aria-label={backLabel}
      >
        <ArrowLeft size={14} />
        {backLabel}
      </a>

      <span className="tracking-[0.02em]">© 2026 R.ODE Battle</span>

      <div className="flex gap-5">
        {FOOTER_LINKS.map((label) => (
          <a key={label} href="#" className="text-orange-500 no-underline hover:underline">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
