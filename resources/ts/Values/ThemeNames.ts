/**
 * アプリケーションで利用可能なテーマ名を表すインターフェース。
 * @interface
 */
export interface ThemeNames {
  /** ダークテーマ名 */
  dark: string;
  /** ライトテーマ名 */
  light: string;
}

/**
 * アプリケーションで使用される実際のテーマ値を含むオブジェクト。
 * これらの値は、現在のテーマを設定または確認する際に使用される。
 * @type {ThemeNames}
 */
export const Themes: ThemeNames = {
  dark: "dark-theme",
  light: "light-theme",
};

/**
 * 現在のテーマをローカルストレージに保存する際に使用するキー。
 * このキーは、ストレージからテーマを取得または設定する際に使用する。
 * @type {string}
 */
export const ThemeStorageKey: string = "currentTheme";
