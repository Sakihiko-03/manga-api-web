'use client'
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Pagination } from '@mui/material';
import { useFormik } from 'formik';
import ScrollToTopButton from '@/components/ButtonToTop';
import CardAnime from '@/components/CardAnime';
import SkeletonCardList from '@/components/SkeletonCard';
import { RootState, useAppDispatch } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAniApi } from '@/store/slices/animeSlice2';
import { setCurrentPage } from '@/store/slices/animeSlice2';

// PascalCase ชื่อไฟล์ component
// camelCase ตัวแปร, .ts

const Home = () => {
  const dispatch = useAppDispatch();
  const aniData = useSelector((state: RootState) => state.anime2.aniData);
  const totalAni = useSelector((state: RootState) => state.anime2.totalAni);
  const currentPage = useSelector((state: RootState) => state.anime2.currentPage);
  const showSkeleton = useSelector((state: RootState) => state.anime2.showSkeleton);

  const formik = useFormik({
    initialValues: {
      searchTitle: '',
      searchCategories: '',
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    dispatch(fetchAniApi({
      currentPage,
      searchTitle: formik.values.searchTitle,
      searchCategories: formik.values.searchCategories,
    }));
  }, [currentPage, formik.values.searchTitle, formik.values.searchCategories]);

  return (
    <div className='flex min-h-screen flex-col gap-8 items-center p-4 lg:p-16 bg-gray-400'>
      <TextField
        sx={{ width: '40ch' }}
        value={formik.values.searchTitle}
        onChange={formik.handleChange}
        name='searchTitle'
        id='outlined-basic'
        label='Search'
        variant='outlined' />
      <FormControl>
        <FormLabel id='demo-row-radio-buttons-group-label'>Categories</FormLabel>
        <RadioGroup
          value={formik.values.searchCategories}
          onChange={formik.handleChange}
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='searchCategories'>
          <FormControlLabel value='action' control={<Radio />} label='action' />
          <FormControlLabel value='music' control={<Radio />} label='music' />
          <FormControlLabel value='sports' control={<Radio />} label='sports' />
          <FormControlLabel value='fantasy' control={<Radio />} label='fantasy' />
        </RadioGroup>
      </FormControl>
      <Pagination
        count={Math.ceil(totalAni / 20)}
        page={currentPage}
        onChange={(e, value) => dispatch(setCurrentPage(value))}
        shape='rounded' />
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

export default Home;
