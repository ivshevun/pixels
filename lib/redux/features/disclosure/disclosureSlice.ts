import { createSlice } from "@reduxjs/toolkit";

export interface DisclosureState {
  isNavMenuOpen: boolean;
  isUserMenuOpen: boolean;
  isEditorOpen: boolean;
  isMediaControllerOpen: boolean;
  isBlockInserterOpen: boolean;
}

const initialState: DisclosureState = {
  isNavMenuOpen: false,
  isUserMenuOpen: false,
  isEditorOpen: false,
  isMediaControllerOpen: false,
  isBlockInserterOpen: false,
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

    setEditorOpen: (state, action) => {
      state.isMediaControllerOpen = false;
      state.isBlockInserterOpen = false;

      state.isEditorOpen = action.payload;
    },

    setMediaControllerOpen: (state, action) => {
      state.isEditorOpen = false;
      state.isBlockInserterOpen = false;

      state.isMediaControllerOpen = action.payload;
    },

    setBlockInserterOpen: (state, action) => {
      state.isEditorOpen = false;
      state.isMediaControllerOpen = false;

      state.isBlockInserterOpen = action.payload;
    }
  },
});

export const {
  toggleNavMenu,
  toggleUserMenu,
  setEditorOpen,
  setMediaControllerOpen,
  setBlockInserterOpen,
} = disclosureSlice.actions;


export default disclosureSlice.reducer;
