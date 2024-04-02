import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  userAvatarUrl: string;
}

const initialState: SettingsState = {
  userAvatarUrl: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeAvatarUrl(state, action: PayloadAction<string>) {
      state.userAvatarUrl = action.payload;
    },
  },
});

export const { changeAvatarUrl } = settingsSlice.actions;

export default settingsSlice.reducer;
