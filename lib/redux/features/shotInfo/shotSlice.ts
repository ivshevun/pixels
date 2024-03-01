import { createSlice } from "@reduxjs/toolkit";

export interface ShotState {
  currentFont: string;
  currentModifiers: string[];
  align: string;
  shotDescription: string;
  shotTitle: string;
}

const initialState: ShotState = {
  currentFont: "heading 1",
  currentModifiers: ["bold"],
  align: "left",
  shotDescription: "",
  shotTitle: "",
};

export const shotSlice = createSlice({
  name: "shotInfo",
  initialState,
  reducers: {
    changeFont(state, action) {
      state.currentFont = action.payload;
    },
    changeModifiers(state, action) {
      state.currentModifiers = action.payload;
    },
    changeAlign(state, action) {
      state.align = action.payload;
    },
    changeDescription(state, action) {
      state.shotDescription = action.payload;
    },
    changeTitle(state, action) {
      state.shotTitle = action.payload;
    },
  },
});

export const {
  changeFont,
  changeModifiers,
  changeAlign,
  changeDescription,
  changeTitle,
} = shotSlice.actions;

export default shotSlice.reducer;
