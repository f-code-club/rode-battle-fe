import { keymap } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { AlignLeft, Code2, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { createCssBattleEditorExtensions } from '../config/editorTheme';
import type { EditorThemeOption, PageColors } from '../config/editorThemes';
import SubmitButton from './SubmitButton';

interface CssEditorPanelProps {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  onMinify?: () => void;
  onFormat?: () => void;
  isSubmitting?: boolean;
  isLocked?: boolean;
  lockReason?: string;
  theme: EditorThemeOption;
  colors: Pick<PageColors, 'border'>;
}

export default function CssEditorPanel({
  code,
  onCodeChange,
  onSubmit,
  onMinify,
  onFormat,
  isSubmitting,
  isLocked,
  lockReason,
  theme,
  colors,
}: CssEditorPanelProps) {
  const submitShortcutExtension = useMemo(() => {
    return keymap.of([
      {
        key: 'Mod-Enter',
        run: () => {
          if (!isSubmitting && !isLocked) {
            onSubmit();
          }
          return true;
        },
      },
    ]);
  }, [onSubmit, isSubmitting, isLocked]);

  const extensions = useMemo(
    () => [
      ...createCssBattleEditorExtensions(theme.extension, theme.background, theme.foreground),
      submitShortcutExtension,
    ],
    [theme, submitShortcutExtension],
  );
  const { border } = colors;

  const isMac = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /Mac|iPhone|iPad/i.test(navigator.userAgent);
  }, []);
  const modKey = isMac ? 'CMD' : 'CTRL';

  return (
    <div
      style={{ backgroundColor: theme.background, color: theme.foreground, borderColor: border }}
      className="flex h-130 min-h-0 flex-col overflow-hidden border-b lg:h-full lg:border-r lg:border-b-0"
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          onChange={onCodeChange}
          height="100%"
          theme="none"
          className="h-full"
          extensions={extensions}
        />
      </div>

      <div
        style={{ borderColor: border }}
        className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs opacity-75">
            <Code2 className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold">{code.length}</span>
            <span className="opacity-70">chars</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onMinify && (
              <button
                type="button"
                onClick={onMinify}
                title="Minify code (removes comments and extra whitespace)"
                style={{ borderColor: border }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-white/5 px-2.5 py-1 text-xs font-medium opacity-80 backdrop-blur-sm transition-all hover:bg-white/10 hover:opacity-100 active:scale-95"
              >
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Minify</span>
              </button>
            )}

            {onFormat && (
              <button
                type="button"
                onClick={onFormat}
                title="Format code (beautifies indentation and line breaks)"
                style={{ borderColor: border }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-white/5 px-2.5 py-1 text-xs font-medium opacity-80 backdrop-blur-sm transition-all hover:bg-white/10 hover:opacity-100 active:scale-95"
              >
                <AlignLeft className="h-3 w-3 text-sky-400" />
                <span>Format</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex" title={`Shortcut: ${modKey} + Enter`}>
            <kbd className="inline-flex h-5.5 min-w-6 items-center justify-center rounded-[5px] border border-white/15 bg-[#181a20] px-1.5 font-mono text-[10px] font-bold tracking-wider text-zinc-300 shadow-[0_2px_0_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] select-none">
              {modKey}
            </kbd>
            <kbd className="inline-flex h-5.5 min-w-6 items-center justify-center rounded-[5px] border border-white/15 bg-[#181a20] px-1.5 font-mono text-[10px] font-bold tracking-wider text-zinc-300 shadow-[0_2px_0_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] select-none">
              ENTER
            </kbd>
          </div>

          <SubmitButton
            onClick={onSubmit}
            disabled={isSubmitting || isLocked}
            label={isSubmitting ? 'Submitting...' : isLocked ? (lockReason ?? 'Submissions closed') : 'Submit'}
          />
        </div>
      </div>
    </div>
  );
}
