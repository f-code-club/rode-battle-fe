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

export const DEFAULT_EDITOR_THEME_ID = 'github-dark';

export function getEditorTheme(id: string): EditorThemeOption {
  return EDITOR_THEMES.find((theme) => theme.id === id) ?? EDITOR_THEMES[0]!;
}

export interface PageColors {
  background: string;
  foreground: string;
  border: string;
  surface: string;
}

export function getPageColors(theme: EditorThemeOption): PageColors {
  return {
    background: theme.background,
    foreground: theme.foreground,
    border: `color-mix(in srgb, ${theme.foreground} 22%, transparent)`,
    surface: `color-mix(in srgb, ${theme.foreground} 10%, ${theme.background})`,
  };
}
