import { createSlice } from "@reduxjs/toolkit";

export interface TextState {
  currentFont: string;
  currentModifiers: string[];
  align: string;
  shotDescription: string
}

const initialState: TextState = {
  currentFont: "heading 1",
  currentModifiers: ["bold"],
  align: "left",
  shotDescription: "",
}

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    changeFont(state, action) {
      state.currentFont = action.payload
    },
    changeModifiers(state, action) {
      state.currentModifiers = action.payload
    },
    changeAlign(state, action) {
      state.align = action.payload
    },
    changeShotDescription(state, action) {
      state.shotDescription = action.payload
    }
  }
})

export const {
  changeFont,
  changeModifiers,
  changeAlign,
  changeShotDescription
} = textSlice.actions

export default textSlice.reducer