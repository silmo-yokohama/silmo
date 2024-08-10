/**
 * テーマ管理のためのReduxスライス
 * テーマの状態管理と更新ロジックを提供
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Themes, ThemeName, ThemeStorageKey } from "../../values/themes";
import { setThemeInDOM } from "../../utils/themeUtils";

interface ThemeState {
  activeTheme: ThemeName;
}

const initialState: ThemeState = {
  activeTheme: (localStorage.getItem(ThemeStorageKey) as ThemeName) || Themes.light,
};

/**
 * 有効なテーマかどうかを確認し、有効な場合はそのテーマを、無効な場合はデフォルトテーマを返す
 * @param theme 確認するテーマ
 * @returns 有効なテーマまたはデフォルトテーマ
 */
const validateTheme = (theme: string): ThemeName => {
  return Object.values(Themes).includes(theme as ThemeName) ? (theme as ThemeName) : Themes.light;
};

/**
 * テーマスライスの定義
 */
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const newTheme = validateTheme(action.payload);
      state.activeTheme = newTheme;
      localStorage.setItem(ThemeStorageKey, newTheme);
      setThemeInDOM(newTheme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
