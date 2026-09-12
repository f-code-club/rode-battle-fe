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
  const previewDoc = `<style>html,body{width:${STAGE_WIDTH}px;height:${STAGE_HEIGHT}px;overflow:hidden;box-sizing:border-box;margin:0}*{box-sizing:border-box}</style>${debouncedCode}`;

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

    const updateScale = () => setScale(wrapper.clientWidth / STAGE_WIDTH);
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
                top: 0,
                left: 0,
                width: STAGE_WIDTH,
                height: STAGE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
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

        <div style={{ borderColor: colors.border }} className="flex border-b">
          <span className="border-b-2 border-[#A9812D] px-1 py-2 text-[13px] font-semibold whitespace-nowrap">
            Your stats
          </span>
        </div>

        <div className="flex gap-3">
          <div
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            className="flex-1 rounded-xs border px-3.5 py-3"
          >
            <div className="text-[10px] font-semibold tracking-[0.04em] uppercase opacity-70">Last score</div>
            <div className="mt-1 font-mono text-xl font-semibold">
              {isHistoryError ? (
                <span className="text-xs font-semibold text-red-500">Error</span>
              ) : isJudging ? (
                <span className="inline-flex animate-pulse items-center text-xs font-bold text-amber-500">
                  Judging...
                </span>
              ) : lastScore != null ? (
                `${lastScore}%`
              ) : (
                '–'
              )}
            </div>
          </div>
          <div
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            className="flex-1 rounded-xs border px-3.5 py-3"
          >
            <div className="text-[10px] font-semibold tracking-[0.04em] uppercase opacity-70">High score</div>
            <div className="mt-1 font-mono text-xl font-semibold">
              {isHistoryError ? (
                <span className="text-xs font-semibold text-red-500">Error</span>
              ) : highScore != null ? (
                `${highScore}%`
              ) : (
                '–'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
