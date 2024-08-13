import "./bootstrap";
import "../css/app.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
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
  resolve: (name) =>
    // @ts-ignore
    resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
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
