import CodeMirror from '@uiw/react-codemirror';
import { useMemo } from 'react';
import { createCssBattleEditorExtensions } from '../config/editorTheme';
import type { EditorThemeOption, PageColors } from '../config/editorThemes';
import SubmitButton from './SubmitButton';

interface CssEditorPanelProps {
  code: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
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
  isSubmitting,
  isLocked,
  lockReason,
  theme,
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

      <div style={{ borderColor: border }} className="flex shrink-0 items-center justify-center gap-3 border-t p-4">
        <SubmitButton
          onClick={onSubmit}
          disabled={isSubmitting || isLocked}
          label={isSubmitting ? 'Submitting...' : isLocked ? (lockReason ?? 'Submissions closed') : 'Submit'}
        />
      </div>
    </div>
  );
}
