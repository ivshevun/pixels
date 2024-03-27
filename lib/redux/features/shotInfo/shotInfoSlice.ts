import { createSlice } from "@reduxjs/toolkit";

interface ShotsLikes {
  [shotId: string]: number;
}

const initialState: ShotsLikes = {};

export const shotInfoSlice = createSlice({
  name: "shotInfo",
  initialState,
  reducers: {
    changeShotsLikes: (state, action) => {
      state[action.payload.shotId] = action.payload.likes;
    },
  },
});

export const { changeShotsLikes } = shotInfoSlice.actions;

export default shotInfoSlice.reducer;
