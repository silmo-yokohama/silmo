import themeReducer, { setTheme } from "../../../store/slices/themeSlice";

describe("themeSlice", () => {
  it("初期状態を正しく処理すること", () => {
    // 未定義の状態と不明なアクションタイプでreducerを呼び出す
    expect(themeReducer(undefined, { type: "unknown" })).toEqual({
      activeTheme: "light",
    });
  });

  it("setThemeアクションを正しく処理すること", () => {
    // lightテーマからdarkテーマに変更
    const actual = themeReducer({ activeTheme: "light" }, setTheme("dark"));
    expect(actual.activeTheme).toEqual("dark");
  });

  it("無効な入力に対してデフォルトのテーマを使用すること", () => {
    // 無効なテーマ名を指定
    const actual = themeReducer({ activeTheme: "light" }, setTheme("invalid"));
    expect(actual.activeTheme).toEqual("light");
  });
});
