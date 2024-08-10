/**
 * テーマ管理のためのReduxスライス
 * テーマの状態管理と更新ロジックを提供
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeName, ThemeStorageKey } from "../../values/themes";
import { setThemeInDOM, isValidTheme } from "../../utils/themeUtils";

interface ThemeState {
  activeTheme: ThemeName;
}

const initialState: ThemeState = {
  activeTheme: (window.localStorage.getItem(ThemeStorageKey) as ThemeName) || "light",
};

/**
 * テーマスライスの定義
 */
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const newTheme = isValidTheme(action.payload) ? action.payload : "light";
      state.activeTheme = newTheme;
      localStorage.setItem(ThemeStorageKey, newTheme);
      setThemeInDOM(newTheme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
