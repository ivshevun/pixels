import { createSlice } from "@reduxjs/toolkit";

interface Favourites {
  [shotId: string]: boolean;
}

const initialState: Favourites = {};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourited: (state, action) => {
      state[action.payload.shotId] = action.payload.isFavourite;
    },
  },
});

export const { setFavourited } = favouritesSlice.actions;

export default favouritesSlice.reducer;
