import { createSlice } from "@reduxjs/toolkit";
import { Themes, ThemeStorageKey } from "../Values/ThemeNames";
import { useTheme } from "../Utils/useTheme";

const setTheme = (themeName: string) => {
  const theme = useTheme();
  const newThemeName = theme.isExists(themeName) ? themeName : Themes.light;

  theme.setCurrent(newThemeName);
  theme.apply(newThemeName);
};

export const themeSlicer = createSlice({
  name: "ThemeChanger",
  initialState: {
    activeTheme: window.localStorage.getItem(ThemeStorageKey) || Themes.light,
  },
  reducers: {
    themeChange: (state, action) => {
      state.activeTheme = action.payload;
      setTheme(action.payload);
    },
  },
});

export const { themeChange } = themeSlicer.actions;
export default themeSlicer.reducer;
