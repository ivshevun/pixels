import { createSlice } from "@reduxjs/toolkit";

export interface TextState {
  text: string;
  currentModifiers: string[];
  align: string;
}

const initialState: TextState = {
  text: "heading 1",
  currentModifiers: ["bold"],
  align: "left",
}

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    changeFont(state, action) {
      state.text = action.payload
    },
    changeModifiers(state, action) {
      state.currentModifiers = action.payload
    },
    changeAlign(state, action) {
      state.align = action.payload
    }
  }
})

export const {
  changeFont,
  changeModifiers,
  changeAlign
} = textSlice.actions

export default textSlice.reducer