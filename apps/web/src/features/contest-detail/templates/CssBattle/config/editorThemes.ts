import type { Extension } from '@codemirror/state';
import { aura, defaultSettingsAura } from '@uiw/codemirror-theme-aura';
import { defaultSettingsDracula, dracula } from '@uiw/codemirror-theme-dracula';
import { defaultSettingsGithubDark, githubDark } from '@uiw/codemirror-theme-github';
import { defaultSettingsVscodeDark, vscodeDark } from '@uiw/codemirror-theme-vscode';

export interface EditorThemeOption {
  id: string;
  label: string;
  extension: Extension;
  background: string;
  foreground: string;
}

export const EDITOR_THEMES: EditorThemeOption[] = [
  {
    id: 'dracula',
    label: 'Dracula',
    extension: dracula,
    background: defaultSettingsDracula.background!,
    foreground: defaultSettingsDracula.foreground!,
  },
  {
    id: 'github-dark',
    label: 'GitHub Dark',
    extension: githubDark,
    background: defaultSettingsGithubDark.background!,
    foreground: defaultSettingsGithubDark.foreground!,
  },
  {
    id: 'vscode-dark',
    label: 'VS Code Dark',
    extension: vscodeDark,
    background: defaultSettingsVscodeDark.background!,
    foreground: defaultSettingsVscodeDark.foreground!,
  },
  {
    id: 'aura',
    label: 'Aura',
    extension: aura,
    background: defaultSettingsAura.background!,
    foreground: defaultSettingsAura.foreground!,
  },
];

export const DEFAULT_EDITOR_THEME_ID = 'dracula';

export function getEditorTheme(id: string): EditorThemeOption {
  return EDITOR_THEMES.find((theme) => theme.id === id) ?? EDITOR_THEMES[0]!;
}
