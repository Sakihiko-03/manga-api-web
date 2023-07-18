'use client'
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Pagination } from '@mui/material';
import { useFormik } from 'formik';
import ScrollToTopButton from '@/components/ButtonToTop';
import CardAnime from '@/components/CardAnime';
import SkeletonCardList from '@/components/SkeletonCard';
import { useAppDispatch } from '@/store';
import { useEffect } from 'react';
import { aniDataSelector, currentPageSelector, setAniData, setCurrentPage, setShowSkeleton, setTotalAni, showSkeletonSelector, totalAniSelector } from '@/store/slices/animeSlice';
import { useSelector } from 'react-redux';
import GetAnimeData from '@/api/animeApi';

// PascalCase ชื่อไฟล์ component
// camelCase ตัวแปร, .ts

const Home = () => {
  const dispatch = useAppDispatch();
  const aniData = useSelector(aniDataSelector);
  const totalAni = useSelector(totalAniSelector);
  const currentPage = useSelector(currentPageSelector);
  const showSkeleton = useSelector(showSkeletonSelector);
  
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

export default Home;
