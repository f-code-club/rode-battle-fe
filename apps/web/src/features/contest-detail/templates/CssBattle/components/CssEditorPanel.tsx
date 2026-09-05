import CodeMirror from '@uiw/react-codemirror';
import { useMemo } from 'react';
import { createCssBattleEditorExtensions } from '../config/editorTheme';
import { EDITOR_THEMES, type EditorThemeOption, type PageColors } from '../config/editorThemes';

interface CssEditorPanelProps {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  theme: EditorThemeOption;
  themeId: string;
  onThemeIdChange: (id: string) => void;
  colors: Pick<PageColors, 'border'>;
}

export default function CssEditorPanel({
  code,
  onCodeChange,
  onSubmit,
  theme,
  themeId,
  onThemeIdChange,
  colors,
}: CssEditorPanelProps) {
  const extensions = useMemo(
    () => createCssBattleEditorExtensions(theme.extension, theme.background, theme.foreground),
    [theme],
  );
  const { border } = colors;

  return (
    <div
      style={{ backgroundColor: theme.background, color: theme.foreground, borderColor: border }}
      className="flex h-130 min-h-0 flex-col overflow-hidden border-b lg:h-full lg:border-r lg:border-b-0"
    >
      <div style={{ borderColor: border }} className="flex shrink-0 items-center justify-between border-b">
        <span
          style={{ borderColor: border }}
          className="border-r border-b-2 border-b-[#A9812D] px-4 py-3.5 text-xs font-medium tracking-[0.02em]"
        >
          index.html
        </span>

        <select
          value={themeId}
          onChange={(e) => onThemeIdChange(e.target.value)}
          aria-label="Editor color theme"
          style={{ backgroundColor: theme.background, color: theme.foreground, borderColor: border }}
          className="mr-3 cursor-pointer rounded-sm border px-2 py-1 text-xs outline-none"
        >
          {EDITOR_THEMES.map((option) => (
            <option key={option.id} value={option.id} className="bg-[#20242C] text-white">
              {option.label}
            </option>
          ))}
        </select>
      </div>

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

      <div style={{ borderColor: border }} className="flex shrink-0 items-center justify-end gap-3 border-t p-4">
        <button
          type="button"
          onClick={onSubmit}
          className="cursor-pointer rounded-sm bg-green-700 px-6.5 py-2.5 text-xs font-semibold tracking-[0.02em] whitespace-nowrap text-white transition-colors hover:bg-[#256532]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
