"use client";
import { configureStore } from "@reduxjs/toolkit";
import disclosureReducer from "./features/disclosure/disclosureSlice";
import textReducer from "./features/textSettings/textSlice";

export const store = configureStore({
  reducer: {
    disclosure: disclosureReducer,
    text: textReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
