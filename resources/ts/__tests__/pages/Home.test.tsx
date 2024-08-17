import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../../pages/Home";

const mockStore = configureStore([]);

describe("Homeページコンポーネント", () => {
  it("正しくレンダリングされること", () => {
    // モックストアの作成
    const store = mockStore({
      theme: { activeTheme: "light" },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // 'test'というテキストが存在することを確認
    expect(getByText("test")).toBeInTheDocument();
  });
});
