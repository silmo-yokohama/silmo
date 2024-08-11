/**
 * API読み込み状態を更新するスライス
 */

import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingState } from "../../types/ApiLoadingTypes";

/**
 * API読み込み状態の初期値
 */
const initialState: ApiLoadingState = {
  counter: 0,
};

/**
 * API読み込み状態を管理するスライス
 */
const apiLoadingSlice = createSlice({
  name: "apiLoading",
  initialState,
  reducers: {
    incrementApiLoadingCounter: (state) => {
      state.counter += 1;
    },
    decrementApiLoadingCounter: (state) => {
      state.counter = Math.max(0, state.counter - 1);
    },
  },
});

export const { incrementApiLoadingCounter, decrementApiLoadingCounter } = apiLoadingSlice.actions;
export default apiLoadingSlice.reducer;
