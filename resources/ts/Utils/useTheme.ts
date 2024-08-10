import { Themes, ThemeStorageKey } from "../Values/ThemeNames";

/**
 * テーマ操作のためのフックインターフェース。
 * @interface
 */
export interface ThemeHook {
  /** 現在のテーマを取得する関数。 */
  getCurrent: () => string;
  /** 新しいテーマを設定する関数。 */
  setCurrent: (theme: string) => void;
  /** 指定されたテーマをDOMに適用する関数。 */
  apply: (theme: string) => void;
  /** 指定されたテーマが有効なテーマであるかを確認する関数。 */
  isExists: (theme: string) => boolean;
}

/**
 * テーマ操作のためのカスタムフック。
 * テーマの取得、設定、適用、存在確認を行うメソッドを提供します。
 *
 * @returns {ThemeHook} テーマ操作のためのメソッドを含むオブジェクト
 */
export const useTheme: () => ThemeHook = () => {
  /**
   * ローカルストレージから現在のテーマを取得します。
   * テーマが設定されていない場合はデフォルトのライトテーマを返します。
   * @returns {string} 現在のテーマ、または未設定の場合はライトテーマ
   */
  const getCurrent = (): string => {
    return window.localStorage.getItem(ThemeStorageKey) || Themes.light;
  };

  /**
   * 指定されたテーマをローカルストレージに保存します。
   * @param {string} theme - 設定するテーマ
   */
  const setCurrent = (theme: string): void => {
    window.localStorage.setItem(ThemeStorageKey, theme);
  };

  /**
   * 指定されたテーマをHTML要素に適用します。
   * currentTheme属性を使用してテーマを設定します。
   * @param {string} theme - 適用するテーマ
   */
  const apply = (theme: string): void => {
    const html: HTMLHtmlElement | null = document.querySelector("html");
    html && html.setAttribute("currentTheme", theme);
  };

  /**
   * 指定されたテーマが有効なテーマであるかを確認します。
   * @param {string} theme - 確認するテーマ
   * @returns {boolean} テーマが有効な場合はtrue、そうでない場合はfalse
   */
  const isExists = (theme: string): boolean => {
    return Boolean(Object.values(Themes).find((t: string) => t === theme));
  };

  return {
    getCurrent,
    setCurrent,
    isExists,
    apply,
  };
};
