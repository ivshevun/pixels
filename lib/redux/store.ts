"use client";
import { configureStore } from "@reduxjs/toolkit";
import disclosureReducer from "./features/disclosure/disclosureSlice";
import shotReducer from "./features/shotCreation/shotCreationSlice";
import shotTextInfoReducer from "./features/shotText/shotTextInfo";

export const store = configureStore({
  reducer: {
    disclosure: disclosureReducer,
    shotTextInfo: shotTextInfoReducer,
    shotCreation: shotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
