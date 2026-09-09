import { useState } from 'react';
import type { CssBattleTarget } from '../../../types';
import type { PageColors } from '../config/editorThemes';

interface CssTargetPanelProps {
  target?: CssBattleTarget;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
}

function ColorChip({ hex, colors }: { hex: string; colors: CssTargetPanelProps['colors'] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      className="flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 transition-opacity hover:opacity-80"
    >
      <span className="inline-block h-3.5 w-3.5 rounded-full" style={{ background: hex }} />
      <span className="font-mono text-xs opacity-90">{copied ? 'Copied!' : hex}</span>
    </button>
  );
}

export default function CssTargetPanel({ target, colors }: CssTargetPanelProps) {
  const colorCodes = target?.colorCodes ?? [];

  return (
    <div style={{ color: colors.foreground }} className="flex h-130 min-h-0 flex-col overflow-hidden lg:h-full">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
          {target?.imageUrl ? (
            <img src={target.imageUrl} alt="Target" className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs opacity-60">
              No target image available for this problem.
            </div>
          )}
        </div>

        {colorCodes.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-bold">Colors</span>
              <div className="flex items-center gap-1">
                {['Ctrl', 'Shift', 'C'].map((key) => (
                  <kbd
                    key={key}
                    style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                    className="rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase opacity-60"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorCodes.map((hex) => (
                <ColorChip key={hex} hex={hex} colors={colors} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
