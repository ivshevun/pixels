import { createSlice } from "@reduxjs/toolkit";

export interface DisclosureState {
  isNavMenuOpen: boolean;
  isUserMenuOpen: boolean;
}

const initialState: DisclosureState = {
  isNavMenuOpen: false,
  isUserMenuOpen: false,
};

export const disclosureSlice = createSlice({
  name: "disclosure",
  initialState,
  reducers: {
    toggleNavMenu: (state) => {
      
      if (state.isUserMenuOpen) state.isUserMenuOpen = false;
    
      state.isNavMenuOpen = !state.isNavMenuOpen;
    },

    toggleUserMenu: (state) => {
      if (state.isNavMenuOpen) state.isNavMenuOpen = false;

      state.isUserMenuOpen = !state.isUserMenuOpen;
    },
  },
});

export const {
  toggleNavMenu,
  toggleUserMenu,
} = disclosureSlice.actions;

export default disclosureSlice.reducer;
