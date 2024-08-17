import { store } from "../../store";

describe("Reduxストア", () => {
  it("正しい初期状態を持つこと", () => {
    const state = store.getState();

    // themeプロパティが存在することを確認
    expect(state).toHaveProperty("theme");
    // activeThemeプロパティが存在することを確認
    expect(state.theme).toHaveProperty("activeTheme");
  });
});
