/**
 * Reduxストアの設定
 * アプリケーション全体の状態管理を行う
 */

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import apiLoadingReducer from "./slices/apiLoadingSlices";
import menuReducer from "./slices/menuSlice";
/**
 * Reduxストアを構成
 */
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    theme: themeReducer,
    apiLoading: apiLoadingReducer,
  },
});

/**
 * ルートステートの型定義
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * ディスパッチ関数の型定義
 */
export type AppDispatch = typeof store.dispatch;
