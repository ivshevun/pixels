import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShotInfo {
  predictedLikes: number;
}

const initialState: ShotInfo = {
  predictedLikes: 0,
};

export const shotInfoSlice = createSlice({
  name: "shotInfo",
  initialState,
  reducers: {
    changePredictedLikes: (state, action: PayloadAction<number>) => {
      state.predictedLikes = action.payload;
    },
  },
});

export const { changePredictedLikes } = shotInfoSlice.actions;

export default shotInfoSlice.reducer;
