import { createSlice } from "@reduxjs/toolkit";

interface ProfileShotsState {
  sortBy: string;
}

const initialState: ProfileShotsState = {
  sortBy: "Recent shots",
};

export const profileShotsSlice = createSlice({
  name: "profileShots",
  initialState,
  reducers: {
    changeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { changeSortBy } = profileShotsSlice.actions;

export default profileShotsSlice.reducer;
