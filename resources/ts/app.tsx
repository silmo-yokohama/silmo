import "./bootstrap";
import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { InertiaProgress } from "@inertiajs/progress";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

InertiaProgress.init({
  // 色を設定（例: 青色）
  color: "#4B5563",
  // トランジションの長さをミリ秒で設定
  delay: 250,
  // プログレスバーを表示する最小時間（ミリ秒）
  includeCSS: true,
  showSpinner: false,
});

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  },
});
