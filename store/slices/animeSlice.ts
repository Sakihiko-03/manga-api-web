import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Anime } from '@/types/anime';

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
  name: 'anime',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAniData: (state:AnimeState, action: PayloadAction<Anime[]>) => {
      state.aniData = action.payload;
    },
    setTotalAni: (state:AnimeState, action: PayloadAction<number>) => {
      state.totalAni = action.payload;
    },
    setCurrentPage: (state:AnimeState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setShowSkeleton: (state:AnimeState, action: PayloadAction<boolean>) => {
      state.showSkeleton = action.payload;
    },
  },
});

// export const { increment, decrement, incrementByAmount } = animeSlice.actions;
export const { setAniData, setTotalAni, setCurrentPage, setShowSkeleton } =
  animeSlice.actions;

export const aniDataSelector = (state: RootState) => state.anime.aniData;
export const totalAniSelector = (state: RootState) => state.anime.totalAni;
export const currentPageSelector = (state: RootState) => state.anime.currentPage;
export const showSkeletonSelector = (state: RootState) => state.anime.showSkeleton;

export default animeSlice.reducer;
