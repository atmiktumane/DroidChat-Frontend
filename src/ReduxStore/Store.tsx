// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web
import userSummaryReducer from "./Slices/userSummarySlice";
import loadingReducer from "./Slices/loadingSlice";

// 1. Combine reducers
const rootReducer = combineReducers({
  userSummary: userSummaryReducer,
  // add other reducers here if needed
  loading: loadingReducer,
});

// 2. Persist configuration — only for userSummary
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSummary"], // only persist this slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

export const persistor = persistStore(store);
