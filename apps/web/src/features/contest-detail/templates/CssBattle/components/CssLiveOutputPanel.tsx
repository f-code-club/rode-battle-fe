import { formatScore } from '@/lib/utils';
import { Loader2, Trophy } from 'lucide-react';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import type { CssBattleTarget } from '../../../types';
import type { PageColors } from '../config/editorThemes';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../config/stage';

const PREVIEW_DEBOUNCE_MS = 180;

interface CssLiveOutputPanelProps {
  code: string;
  target?: CssBattleTarget;
  compare: boolean;
  diff: boolean;
  lastScore?: number | null;
  highScore?: number | null;
  isJudging?: boolean;
  isHistoryError?: boolean;
  colors: Pick<PageColors, 'foreground' | 'border' | 'surface'>;
}

function TargetImage({
  target,
  className,
  onError,
}: {
  target?: CssBattleTarget;
  className?: string;
  onError: () => void;
}) {
  if (!target?.imageUrl) return null;
  return (
    <img src={target.imageUrl} alt="Target" className={className ?? 'h-full w-full object-contain'} onError={onError} />
  );
}

export default function CssLiveOutputPanel({
  code,
  target,
  compare,
  diff,
  lastScore,
  highScore,
  isJudging,
  isHistoryError,
  colors,
}: CssLiveOutputPanelProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasTargetImage = Boolean(target?.imageUrl) && !imageFailed;
  const [compareX, setCompareX] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  const [debouncedCode] = useDebounceValue(code, PREVIEW_DEBOUNCE_MS);
  const previewDoc = `<style>html,body{width:${STAGE_WIDTH}px;height:${STAGE_HEIGHT}px;overflow:hidden;margin:0}</style>${debouncedCode}`;

  const [prevCompare, setPrevCompare] = useState(compare);
  if (compare !== prevCompare) {
    setPrevCompare(compare);
    if (!compare) {
      setCompareX(100);
    }
  }

  useEffect(() => {
    const wrapper = stageWrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => setScale(wrapper.getBoundingClientRect().width / STAGE_WIDTH);
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const handleCompareMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!compare) return;
    const PAD = 16;
    const outer = e.currentTarget.getBoundingClientRect();
    const left = outer.left + PAD;
    const width = outer.width - PAD * 2;
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    setCompareX(x);
    setDragging(true);
  };

  const handleCompareLeave = () => {
    setCompareX(100);
    setDragging(false);
  };

  return (
    <div
      style={{ color: colors.foreground, borderColor: colors.border }}
      className="flex h-130 min-h-0 flex-col overflow-hidden border-b lg:h-full lg:border-r lg:border-b-0"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div
          onMouseMove={handleCompareMove}
          onMouseLeave={handleCompareLeave}
          className={`relative -m-4 p-4 ${compare ? 'cursor-ew-resize' : 'cursor-default'}`}
        >
          <div
            ref={stageWrapperRef}
            style={{ aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}`, isolation: 'isolate' }}
            className="relative w-full overflow-hidden bg-white"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zoom: scale,
              }}
            >
              <iframe
                title="live output"
                srcDoc={previewDoc}
                sandbox=""
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                className="pointer-events-none border-none"
              />
            </div>
            {(compare || diff) && !hasTargetImage && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 px-4 text-center text-xs text-white">
                No target image available for this problem.
              </div>
            )}
            {diff && hasTargetImage && (
              <div className="pointer-events-none absolute inset-0 mix-blend-difference">
                <TargetImage target={target} onError={() => setImageFailed(true)} />
              </div>
            )}
            {compare && hasTargetImage && (
              <>
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                  <TargetImage target={target} onError={() => setImageFailed(true)} />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${compareX}%)`,
                    transition: dragging ? 'none' : 'clip-path 0.25s ease',
                  }}
                >
                  <TargetImage target={target} onError={() => setImageFailed(true)} />
                </div>
                <div
                  className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#A9812D]"
                  style={{ left: `${compareX}%` }}
                />
              </>
            )}
          </div>
        </div>

        <div style={{ borderColor: colors.border }} className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" />
            <span className="text-xs font-bold tracking-wider text-white/90 uppercase">Battle Stats</span>
          </div>
          {highScore != null && (
            <span className="font-mono text-xs font-semibold text-amber-400/90">Match: {formatScore(highScore)}%</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            style={{ borderColor: colors.border }}
            className="flex flex-col justify-between rounded-xl border bg-white/3 p-3.5 shadow-sm transition-colors hover:bg-white/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-wider text-white/60 uppercase">Last score</span>
            </div>

            <div className="mt-2.5 flex items-baseline">
              {isHistoryError ? (
                <span className="text-xs font-semibold text-rose-400">Error</span>
              ) : isJudging ? (
                <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
                  <Loader2 size={13} className="animate-spin text-cyan-400" />
                  <span>Judging...</span>
                </div>
              ) : lastScore != null ? (
                <span className="font-mono text-2xl font-bold tracking-tight text-white">{formatScore(lastScore)}</span>
              ) : (
                <span className="font-mono text-2xl font-bold text-white/25">–</span>
              )}
            </div>

            <div className="mt-1 text-[11px] text-white/40">
              {isJudging ? 'Calculating...' : lastScore != null ? 'Latest submission' : 'No submissions yet'}
            </div>
          </div>

          <div
            style={{ borderColor: colors.border }}
            className="flex flex-col justify-between rounded-xl border bg-white/3 p-3.5 shadow-sm transition-colors hover:bg-white/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium tracking-wider text-amber-300/90 uppercase">High score</span>
            </div>

            <div className="mt-2.5 flex items-baseline">
              {isHistoryError ? (
                <span className="text-xs font-semibold text-rose-400">Error</span>
              ) : highScore != null ? (
                <span className="font-mono text-2xl font-bold tracking-tight text-amber-300">
                  {formatScore(highScore)}
                </span>
              ) : (
                <span className="font-mono text-2xl font-bold text-white/25">–</span>
              )}
            </div>

            <div className="mt-1 text-[11px] text-white/40">{highScore != null ? 'Personal best' : 'No score yet'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
