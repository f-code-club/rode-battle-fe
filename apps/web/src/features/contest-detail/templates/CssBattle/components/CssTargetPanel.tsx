import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { CssBattleTarget } from '../../../types';
import type { PageColors } from '../config/editorThemes';

interface CssTargetPanelProps {
  target?: CssBattleTarget;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
}

function ColorChip({ hex, colors }: { hex: string; colors: CssTargetPanelProps['colors'] }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error('Failed to copy color code.');
    }
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
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(target?.imageUrl) && !imageFailed;

  return (
    <div style={{ color: colors.foreground }} className="flex h-130 min-h-0 flex-col overflow-hidden lg:h-full">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
          {showImage ? (
            <img
              src={target?.imageUrl}
              alt="Target"
              className="h-full w-full object-contain"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs opacity-60">
              No target image available for this problem.
            </div>
          )}
        </div>

        {colorCodes.length > 0 && (
          <div>
            <div className="mb-3">
              <span className="text-sm font-bold">Colors</span>
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
