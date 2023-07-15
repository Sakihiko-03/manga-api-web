// Create a Redux Store
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/slices/counterSlice";
import animeSlice from "./slices/animeSlice";

export const store = configureStore({
  reducer: {
    // Add Slice Reducers to the Store
    counter: counterReducer,
    anime: animeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
