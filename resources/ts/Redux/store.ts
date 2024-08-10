import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlicer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
