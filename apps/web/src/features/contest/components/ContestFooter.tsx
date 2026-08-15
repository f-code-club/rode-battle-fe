import { ArrowLeft } from 'lucide-react';

const FOOTER_LINKS = ['Rules', 'Leaderboard', 'Support'];

interface ContestFooterProps {
  backTo: string;
  backLabel: string;
}

export default function ContestFooter({ backTo, backLabel }: ContestFooterProps) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-x-4 px-7 py-3.5 text-xs text-gray-500">
      <a
        href={backTo}
        className="flex items-center gap-1 text-gray-400 transition-colors hover:text-gray-700"
        aria-label={backLabel}
      >
        <ArrowLeft size={14} />
        {backLabel}
      </a>

      <span className="tracking-[0.02em]">© 2026 R.ODE Battle</span>

      <div className="flex gap-5">
        {FOOTER_LINKS.map((label) => (
          <a key={label} href="#" className="text-orange-700 no-underline hover:text-black hover:underline">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
