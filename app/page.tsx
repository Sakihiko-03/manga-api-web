'use client'
// import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Pagination } from '@mui/material';
import { useFormik } from 'formik';
import ScrollToTopButton from '@/components/button_to_top';
import CardAnime from '@/components/card_ani';
import GetAnimeData from './api/route';
import SkeletonCardList from '@/components/skeleton';
import { Anime } from '@/types/anime';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { RootState, store } from '@/store/store';
import { useEffect } from 'react';
import { setAniData, setCurrentPage, setShowSkeleton, setTotalAni } from '@/store/slices/animeSlice';
import { Provider } from 'react-redux';

// PascalCase ชื่อไฟล์ component
// camelCase ตัวแปร, .ts
const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App

const Home = () => {
  // const [AniData, setAniData] = useState<Anime[]>();
  // const [TotalAni, setTotalAni] = useState<number>(1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [showSkeleton, setShowSkeleton] = useState(true);
  const dispatch = useAppDispatch();
  const aniData = useAppSelector((state: RootState) => state.anime.aniData);
  const totalAni = useAppSelector((state: RootState) => state.anime.totalAni);
  const currentPage = useAppSelector((state: RootState) => state.anime.currentPage);
  const showSkeleton = useAppSelector((state: RootState) => state.anime.showSkeleton);

  const formik = useFormik({
    initialValues: {
      searchTitle: '',
      searchCategories: '',
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    const getData = async () => {
      const { data, count } = await GetAnimeData(
        currentPage,
        formik.values.searchTitle,
        formik.values.searchCategories);
      // setAniData(data);
      // setTotalAni(count ?? NaN);
      // setShowSkeleton(false);
      dispatch(setAniData(data));
      dispatch(setTotalAni(count ?? NaN));
      dispatch(setShowSkeleton(false));
    }
    getData();
  }, [currentPage, formik.values.searchTitle, formik.values.searchCategories]);

  return (
    <div className="flex min-h-screen flex-col gap-8 items-center p-4 lg:p-16 bg-gray-400">
      <TextField
        sx={{ width: '40ch' }}
        value={formik.values.searchTitle}
        onChange={formik.handleChange}
        name='searchTitle'
        id="outlined-basic"
        label="Search"
        variant="outlined" />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Categories</FormLabel>
        <RadioGroup
          value={formik.values.searchCategories}
          onChange={formik.handleChange}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="searchCategories">
          <FormControlLabel value="action" control={<Radio />} label="action" />
          <FormControlLabel value="music" control={<Radio />} label="music" />
          <FormControlLabel value="sports" control={<Radio />} label="sports" />
          <FormControlLabel value="fantasy" control={<Radio />} label="fantasy" />
        </RadioGroup>
      </FormControl>
      <Pagination
        count={Math.ceil(totalAni / 20)}
        page={currentPage}
        onChange={(e, value) => dispatch(setCurrentPage(value))}
        shape="rounded" />
      {
        showSkeleton ? (
          <>
          <SkeletonCardList />
          </>
        ) : (
          <>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
              <CardAnime value={aniData} />
            </div>
          </>
        )}
      <ScrollToTopButton />
    </div>
  )
}

// export default Home;
