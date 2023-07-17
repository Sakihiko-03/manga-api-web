// Create a Redux Store
import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "./slices/animeSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    // Add Slice Reducers to the Store
    anime: animeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
