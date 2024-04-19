import { createSlice } from "@reduxjs/toolkit";

export interface DisclosureState {
  isNavMenuOpen: boolean;
  isUserMenuOpen: boolean;
  isEditorOpen: boolean;
  isMediaControllerOpen: boolean;
  isComboboxOpen: boolean;
  isCommentsOpen: boolean;
}

const initialState: DisclosureState = {
  isNavMenuOpen: false,
  isUserMenuOpen: false,
  isEditorOpen: false,
  isMediaControllerOpen: false,
  isComboboxOpen: false,
  isCommentsOpen: false,
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

      state.isEditorOpen = action.payload;
    },

    setMediaControllerOpen: (state, action) => {
      state.isEditorOpen = false;

      state.isMediaControllerOpen = action.payload;
    },

    setComboboxOpen: (state, action) => {
      state.isComboboxOpen = action.payload;
    },

    setCommentsOpen: (state, action) => {
      state.isCommentsOpen = action.payload;
    },
  },
});

export const {
  toggleNavMenu,
  toggleUserMenu,
  setEditorOpen,
  setMediaControllerOpen,
  setComboboxOpen,
  setCommentsOpen,
} = disclosureSlice.actions;

export default disclosureSlice.reducer;
