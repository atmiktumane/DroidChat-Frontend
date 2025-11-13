// src/redux/slices/userSummarySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserSummaryState {
  data: any | null;
}

const initialState: UserSummaryState = {
  data: null,
};

const userSummarySlice = createSlice({
  name: "userSummary",
  initialState,
  reducers: {
    setUserSummary: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserSummary } = userSummarySlice.actions;

export default userSummarySlice.reducer;
