/**
 * テーマ関連のユーティリティ関数
 */

import { Themes, ThemeName } from "../values/themes";

/**
 * DOMにテーマを適用
 * @param theme 適用するテーマ名
 */
export const setThemeInDOM = (theme: ThemeName): void => {
  const html: HTMLHtmlElement | null = document.querySelector("html");
  if (html) {
    html.setAttribute("currentTheme", Themes[theme]);
  }
};

/**
 * テーマが有効かどうかを検証
 * @param theme 検証するテーマ名
 * @returns テーマが有効な場合はtrue、そうでない場合はfalse
 */
export const isValidTheme = (theme: string): theme is ThemeName => {
  return theme in Themes;
};
