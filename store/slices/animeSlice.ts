import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Anime } from "@/types/anime";

// Define a type for the slice state
interface AnimeState {
  aniData: Anime[];
  totalAni: number;
  currentPage: number;
  showSkeleton: boolean;
}

// Define the initial state using that type
const initialState: AnimeState = {
  aniData: [],
  totalAni: 1,
  currentPage: 1,
  showSkeleton: true,
};
export const animeSlice = createSlice({
  name: "anime",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  reducers: {
    setAniData: (state, action) => {
      state.aniData = action.payload;
    },
    setTotalAni: (state, action) => {
      state.totalAni = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setShowSkeleton: (state, action) => {
      state.showSkeleton = action.payload;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = animeSlice.actions;
export const { setAniData, setTotalAni, setCurrentPage, setShowSkeleton } =
  animeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default animeSlice.reducer;
