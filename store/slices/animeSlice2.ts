import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Anime } from "@/types/anime";
import GetAnimeData from "@/api/animeApi";

interface AnimeState2 {
  aniData: Anime[];
  totalAni: number;
  currentPage: number;
  showSkeleton: boolean;
  searchTitle: string;
  searchCategories: string;
}

const initialState: AnimeState2 = {
  aniData: [],
  totalAni: 1,
  currentPage: 1,
  showSkeleton: true,
  searchTitle: '',
  searchCategories: '',
};

// First, create the thunk
export const fetchAniApi = createAsyncThunk(
  'anime/fetch',
  async ({
    currentPage,
    searchTitle,
    searchCategories,
  }: {
    currentPage: number;
    searchTitle: string;
    searchCategories: string;
  }) => {
    const { data, count } = await GetAnimeData(
      currentPage,
      searchTitle,
      searchCategories
    );
    return { data, count };
  }
);

export const animeSlice2 = createSlice({
  name: 'anime2',
  initialState,
  reducers: {
    setCurrentPage: (state: AnimeState2, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAniApi.pending, (state) => {
      state.showSkeleton = true;
    });
    builder.addCase(fetchAniApi.fulfilled, (state, { payload }) => {
      state.aniData = payload.data;
      state.totalAni = payload.count ?? 0;
      state.showSkeleton = false;
    });
  },
});

export const { setCurrentPage } = animeSlice2.actions;

export default animeSlice2.reducer;
