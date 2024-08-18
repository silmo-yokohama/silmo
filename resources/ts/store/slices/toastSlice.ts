import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastMessage {
  id: string;
  message: string;
  type: "error" | "warning" | "success" | "info";
}

interface ToastState {
  messages: ToastMessage[];
}

const initialState: ToastState = {
  messages: [],
};

/**
 * トースト用のReduxスライス
 */
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    /**
     * 新しいトーストメッセージを追加する
     * @param state 現在の状態
     * @param action 追加するメッセージの情報
     */
    addToast: (state, action: PayloadAction<Omit<ToastMessage, "id">>) => {
      if (state.messages.length >= 3) {
        state.messages.shift();
      }
      state.messages.push({ ...action.payload, id: Date.now().toString() });
    },
    /**
     * 指定されたIDのトーストメッセージを削除する
     * @param state 現在の状態
     * @param action 削除するメッセージのID
     */
    removeToast: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
