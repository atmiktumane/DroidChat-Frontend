import { configureStore } from "@reduxjs/toolkit";
import userSummaryReducer from "./Slices/UserSummarySlice";

export default configureStore({
  reducer: {
    userSummary: userSummaryReducer,
  },
});
