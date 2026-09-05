import { autocompletion } from '@codemirror/autocomplete';
import { cssLanguage } from '@codemirror/lang-css';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { lintGutter } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { abbreviationTracker, EmmetKnownSyntax } from '@emmetio/codemirror6-plugin';
import { colorPicker, colorPickerTheme } from '@replit/codemirror-css-color-picker';
import { cssValueCompletionSource } from './cssCompletion';
import { emmetSuggestionSource } from './emmetCompletion';
import { syntaxErrorLinter } from './syntaxLint';

const createEditorLayoutTheme = (background: string, foreground: string) =>
  EditorView.theme({
    '&': {
      height: '100%',
      fontSize: '13px',
    },
    '.cm-content': {
      fontFamily: 'var(--mono)',
      padding: '14px 12px',
    },
    '.cm-line': {
      lineHeight: '20px',
    },
    '&.cm-focused': {
      outline: 'none',
    },
    '.cm-scroller': {
      scrollbarWidth: 'thin',
      scrollbarColor: `color-mix(in srgb, ${foreground} 25%, transparent) transparent`,
    },
    '.cm-scroller::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '.cm-scroller::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '.cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: `color-mix(in srgb, ${foreground} 25%, transparent)`,
      borderRadius: '6px',
      border: '2px solid transparent',
      backgroundClip: 'content-box',
    },
    '.cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: `color-mix(in srgb, ${foreground} 40%, transparent)`,
    },
    '.cm-gutters': {
      fontSize: '11px',
      backgroundColor: background,
      color: `color-mix(in srgb, ${foreground} 45%, transparent)`,
      border: 'none',
    },
    '.cm-gutterElement': {
      paddingLeft: '2px',
      paddingRight: '2px',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      minWidth: '14px',
      paddingLeft: '4px',
    },
    '.cm-foldGutter, .cm-foldGutter .cm-gutterElement': {
      width: '10px !important',
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
    '.cm-gutter-lint, .cm-gutter-lint .cm-gutterElement': {
      width: '10px !important',
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
  });

export const editorContentAttributes = (label: string) =>
  EditorView.contentAttributes.of({
    'aria-label': label,
    spellcheck: 'false',
    autocorrect: 'off',
    autocapitalize: 'none',
  });

export function createCssBattleEditorExtensions(themeExtension: Extension, background: string, foreground: string) {
  return [
    html(),
    htmlLanguage.data.of({ autocomplete: emmetSuggestionSource }),
    cssLanguage.data.of({ autocomplete: cssValueCompletionSource }),
    autocompletion(),
    syntaxErrorLinter,
    lintGutter(),
    colorPicker,
    colorPickerTheme,
    themeExtension,
    createEditorLayoutTheme(background, foreground),
    editorContentAttributes('CSS Battle Editor'),
    abbreviationTracker({ syntax: EmmetKnownSyntax.html }),
  ];
}
