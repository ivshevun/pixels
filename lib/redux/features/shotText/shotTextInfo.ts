import { createSlice } from "@reduxjs/toolkit";

interface ShotTextInfo {
  currentFont: string;
  currentModifiers: string[];
  align: string;
}

const initialState: ShotTextInfo = {
  currentFont: "text",
  currentModifiers: [],
  align: "left",
};

const shotTextInfoSlice = createSlice({
  name: "shotTextInfo",
  initialState,
  reducers: {
    changeFont: (state, action) => {
      state.currentFont = action.payload;
    },
    changeModifiers: (state, action) => {
      state.currentModifiers = action.payload;
    },
    changeAlign: (state, action) => {
      state.align = action.payload;
    },
  },
});

export const { changeFont, changeModifiers, changeAlign } =
  shotTextInfoSlice.actions;

export default shotTextInfoSlice.reducer;
