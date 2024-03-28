import { createSlice } from "@reduxjs/toolkit";

interface ShotsLikes {
  [shotId: string]: number;
}

const initialState: ShotsLikes = {};

export const shotsLikesSlice = createSlice({
  name: "shotInfo",
  initialState,
  reducers: {
    changeShotsLikes: (state, action) => {
      state[action.payload.shotId] = action.payload.likes;
    },
  },
});

export const { changeShotsLikes } = shotsLikesSlice.actions;

export default shotsLikesSlice.reducer;
