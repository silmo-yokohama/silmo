/**
 * テーマ関連の定数と型定義
 */

/**
 * 利用可能なテーマの定義
 */
export const Themes = {
  dark: "dark-theme",
  light: "light-theme",
} as const;

/**
 * テーマ名の型定義
 */
export type ThemeName = keyof typeof Themes;

/**
 * テーマ値の型定義
 */
export type ThemeValue = (typeof Themes)[ThemeName];

/**
 * テーマをローカルストレージに保存する際のキー
 */
export const ThemeStorageKey = "currentTheme";
