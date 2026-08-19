import { autocompletion } from '@codemirror/autocomplete';
import { cssLanguage } from '@codemirror/lang-css';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { LanguageSupport } from '@codemirror/language';
import { lintGutter } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { abbreviationTracker, EmmetKnownSyntax } from '@emmetio/codemirror6-plugin';
import { colorPicker, colorPickerTheme } from '@replit/codemirror-css-color-picker';
import { cssValueCompletionSource } from './cssCompletion';
import { emmetSuggestionSource } from './emmetCompletion';
import { syntaxErrorLinter } from './syntaxLint';

export const editorLayoutTheme = EditorView.theme({
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
    scrollbarColor: 'rgba(255,255,255,0.25) transparent',
  },
  '.cm-scroller::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '.cm-scroller::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '.cm-scroller::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: '6px',
    border: '2px solid transparent',
    backgroundClip: 'content-box',
  },
  '.cm-scroller::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  '.cm-gutters': {
    fontSize: '11px',
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

const cssLanguageSupport = new LanguageSupport(
  cssLanguage,
  cssLanguage.data.of({ autocomplete: cssValueCompletionSource }),
);

export function createHtmlEditorExtensions(themeExtension: Extension) {
  return [
    html(),
    htmlLanguage.data.of({ autocomplete: emmetSuggestionSource }),
    autocompletion(),
    syntaxErrorLinter,
    lintGutter(),
    themeExtension,
    editorLayoutTheme,
    editorContentAttributes('CSS Battle HTML Editor'),
    abbreviationTracker({ syntax: EmmetKnownSyntax.html }),
  ];
}

export function createCssEditorExtensions(themeExtension: Extension) {
  return [
    cssLanguageSupport,
    autocompletion(),
    syntaxErrorLinter,
    lintGutter(),
    colorPicker,
    colorPickerTheme,
    themeExtension,
    editorLayoutTheme,
    editorContentAttributes('CSS Battle CSS Editor'),
    // previewEnabled stays off here: the plugin's built-in CSS completion entry can't be relabeled,
    // so Emmet still expands via Tab, just without an unlabeled dropdown entry.
    abbreviationTracker({ syntax: EmmetKnownSyntax.css, previewEnabled: [EmmetKnownSyntax.html] }),
  ];
}
