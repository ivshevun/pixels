import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { changeSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
