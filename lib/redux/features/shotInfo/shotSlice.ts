import { createSlice } from "@reduxjs/toolkit";

export interface ShotState {
  currentFont: string;
  currentModifiers: string[];
  tags: string[];
  align: string;
  shotDescription: string;
  shotTitle: string;
  fileUrl: string;
}

const initialState: ShotState = {
  currentFont: "text",
  currentModifiers: [],
  tags: [],
  align: "left",
  shotDescription: "",
  shotTitle: "",
  fileUrl: "",
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
    changeTags(state, action) {
      state.tags = action.payload;
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
    changeFileUrl(state, action) {
      state.fileUrl = action.payload;
    }
  },
});

export const {
  changeFont,
  changeModifiers,
  changeTags,
  changeAlign,
  changeDescription,
  changeTitle,
  changeFileUrl
} = shotSlice.actions;

export default shotSlice.reducer;
