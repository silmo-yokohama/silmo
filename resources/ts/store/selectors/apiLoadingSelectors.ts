/**
 * API読み込み状態を取得するためのセレクター
 */

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

/**
 * API読み込み状態を選択するセレクター
 */
export const selectApiLoadingCounter = (state: RootState) => state.apiLoading.counter;

/**
 * 現在API呼び出しがローディング中かどうかを判断するセレクター
 */
export const selectIsApiLoading = createSelector(
  [selectApiLoadingCounter],
  (counter) => counter > 0
);
