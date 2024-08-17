import "./bootstrap";
import "../css/app.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { InertiaProgress } from "@inertiajs/progress";
import { Provider } from "react-redux";
import { store } from "./store";
import { ParallaxProvider } from "react-scroll-parallax";

/**
 * Inertia.jsのプログレスバーを初期化
 */
InertiaProgress.init({
  color: "#4B5563",
  delay: 250,
  includeCSS: true,
  showSpinner: false,
});

/**
 * Inertia.jsアプリケーションを作成し、Reduxストアをプロバイド
 */
createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
    const page = pages[`./pages/${name}.tsx`];
    if (!page) {
      return null;
    }
    return pages[`./pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <Provider store={store}>
        <ParallaxProvider>
          <App {...props} />
        </ParallaxProvider>
      </Provider>
    );
  },
});

// スクロール位置をリセットする関数を定義
const resetScrollPosition = () => {
  window.scrollTo(0, 0);
  console.log("scr");
};

// Inertia.js のページ遷移イベントをリッスン
document.addEventListener("inertia:navigate", resetScrollPosition);
