interface ContestHeaderProps {
  title: string;
  subtitle?: string;
  timeRemaining?: string;
}

export default function ContestHeader({ title, subtitle, timeRemaining }: ContestHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-[#A9812D] bg-[#20242C] px-7 py-3.5 text-white">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">{title}</span>
        {subtitle && (
          <>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span className="hidden text-xs tracking-wider whitespace-nowrap text-white/60 uppercase sm:inline">
              {subtitle}
            </span>
          </>
        )}
      </div>

      {timeRemaining && (
        <div className="flex items-center gap-7">
          <div className="text-right">
            <div className="text-xs tracking-wider text-white/50 uppercase">Time remaining</div>
            <div className="text-sm font-medium">{timeRemaining}</div>
          </div>
        </div>
      )}
    </div>
  );
}
