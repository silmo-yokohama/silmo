import "@testing-library/jest-dom";
import { setThemeInDOM, isValidTheme } from "../../utils/themeUtils";

describe("themeUtils", () => {
  describe("setThemeInDOM関数", () => {
    it("HTML要素にテーマ属性を設定すること", () => {
      // document.documentElement.setAttributeをモック化
      document.documentElement.setAttribute = jest.fn();

      setThemeInDOM("light");

      // setAttributeが正しく呼び出されたことを確認
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        "currentTheme",
        "light-theme"
      );
    });
  });

  describe("isValidTheme関数", () => {
    it("有効なテーマに対してtrueを返すこと", () => {
      expect(isValidTheme("light")).toBe(true);
      expect(isValidTheme("dark")).toBe(true);
    });

    it("無効なテーマに対してfalseを返すこと", () => {
      expect(isValidTheme("invalid")).toBe(false);
    });
  });
});
