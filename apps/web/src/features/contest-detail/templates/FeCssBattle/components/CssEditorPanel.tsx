import CodeMirror from '@uiw/react-codemirror';
import { useMemo, useState } from 'react';
import { createCssEditorExtensions, createHtmlEditorExtensions } from '../config/editorTheme';
import { EDITOR_THEMES, getEditorTheme } from '../config/editorThemes';
import { useEditorThemeId } from '../hooks/useEditorThemeId';

type EditorFile = 'html' | 'css';

interface CssEditorPanelProps {
  html: string;
  css: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onSubmit: () => void;
}

const FILE_TABS: { key: EditorFile; label: string }[] = [
  { key: 'html', label: 'index.html' },
  { key: 'css', label: 'style.css' },
];

export default function CssEditorPanel({ html, css, onHtmlChange, onCssChange, onSubmit }: CssEditorPanelProps) {
  const [activeFile, setActiveFile] = useState<EditorFile>('html');
  const [themeId, setThemeId] = useEditorThemeId();

  const theme = useMemo(() => getEditorTheme(themeId), [themeId]);
  const htmlExtensions = useMemo(() => createHtmlEditorExtensions(theme.extension), [theme]);
  const cssExtensions = useMemo(() => createCssEditorExtensions(theme.extension), [theme]);

  return (
    <div
      className="flex h-130 min-h-0 flex-col overflow-hidden border-b border-white/10 lg:h-full lg:border-r lg:border-b-0"
      style={{ backgroundColor: theme.background }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10">
        <div className="flex items-center">
          {FILE_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFile(tab.key)}
              style={activeFile === tab.key ? { color: theme.foreground } : undefined}
              className={`cursor-pointer border-r border-white/10 px-4 py-3 text-xs font-medium tracking-[0.02em] transition-colors ${
                activeFile === tab.key ? 'border-b-2 border-b-[#A9812D]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          aria-label="Editor color theme"
          style={{ backgroundColor: theme.background, color: theme.foreground }}
          className="mr-3 cursor-pointer rounded-sm border border-white/10 px-2 py-1 text-xs outline-none"
        >
          {EDITOR_THEMES.map((option) => (
            <option
              key={option.id}
              value={option.id}
              style={{ backgroundColor: option.background, color: option.foreground }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeFile === 'html' ? (
          <CodeMirror
            key="html"
            value={html}
            onChange={onHtmlChange}
            height="100%"
            theme="none"
            className="h-full"
            extensions={htmlExtensions}
          />
        ) : (
          <CodeMirror
            key="css"
            value={css}
            onChange={onCssChange}
            height="100%"
            theme="none"
            className="h-full"
            extensions={cssExtensions}
          />
        )}
      </div>

      <div className="flex shrink-0 items-center justify-end gap-3 border-t border-white/10 p-4">
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
