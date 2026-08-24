import { useLocalStorage } from 'usehooks-ts';
import { DEFAULT_EDITOR_THEME_ID } from '../config/editorThemes';

const STORAGE_KEY = 'css-battle-editor-theme';

export function useEditorThemeId() {
  return useLocalStorage<string>(STORAGE_KEY, DEFAULT_EDITOR_THEME_ID);
}
