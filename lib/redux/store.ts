"use client";
import { configureStore } from "@reduxjs/toolkit";
import disclosureReducer from "./features/disclosure/disclosureSlice";

export const store = configureStore({
  reducer: {
    disclosure: disclosureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
