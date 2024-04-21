import { createSlice } from "@reduxjs/toolkit";

export interface ShotCreation {
  tags: string[];
  shotDescription: string;
  shotTitle: string;
  fileUrl: string;
}

const initialState: ShotCreation = {
  tags: [],
  shotDescription: "",
  shotTitle: "",
  fileUrl: "",
};

export const shotCreationSlice = createSlice({
  name: "shotCreation",
  initialState,
  reducers: {
    changeTags(state, action) {
      state.tags = action.payload;
    },
    changeDescription(state, action) {
      state.shotDescription = action.payload;
    },
    changeTitle(state, action) {
      state.shotTitle = action.payload;
    },
    changeFileUrl(state, action) {
      state.fileUrl = action.payload;
    },
  },
});

export const { changeTags, changeDescription, changeTitle, changeFileUrl } =
  shotCreationSlice.actions;

export default shotCreationSlice.reducer;
