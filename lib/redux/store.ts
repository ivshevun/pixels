"use client";
import { configureStore } from "@reduxjs/toolkit";
import disclosureReducer from "./features/disclosure/disclosureSlice";
import shotCreationReducer from "./features/shotCreation/shotCreationSlice";
import shotTextInfoReducer from "./features/shotText/shotTextInfo";
import shotInfoReducer from "./features/shotInfo/shotInfoSlice";

export const store = configureStore({
  reducer: {
    disclosure: disclosureReducer,
    shotTextInfo: shotTextInfoReducer,
    shotCreation: shotCreationReducer,
    shotInfo: shotInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
