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
export type ThemeName = (typeof Themes)[keyof typeof Themes];

/**
 * テーマをローカルストレージに保存する際のキー
 */
export const ThemeStorageKey = "currentTheme";
