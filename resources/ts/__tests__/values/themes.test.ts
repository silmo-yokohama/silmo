import { Themes, ThemeStorageKey } from "../../values/themes";

describe("テーマ定数", () => {
  it("正しいテーマ値を持つこと", () => {
    // lightテーマの値を確認
    expect(Themes.light).toBe("light-theme");
    // darkテーマの値を確認
    expect(Themes.dark).toBe("dark-theme");
  });

  it("正しいストレージキーを持つこと", () => {
    // ThemeStorageKeyの値を確認
    expect(ThemeStorageKey).toBe("currentTheme");
  });
});
