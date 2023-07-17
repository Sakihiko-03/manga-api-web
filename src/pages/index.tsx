import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Pagination } from '@mui/material';
import { useFormik } from 'formik';
import ScrollToTopButton from '@/components/ButtonToTop';
import CardAnime from '@/components/CardAnime';
import SkeletonCardList from '@/components/SkeletonCard';
import { useEffect } from 'react';
import { setAniData, setCurrentPage, setShowSkeleton, setTotalAni } from '@/store/slices/animeSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import getAnimeData from '@/api/animeApi';
import Navbar from '@/components/Navbar';

// PascalCase ชื่อไฟล์ component
// camelCase ตัวแปร, .ts

const Home = () => {
  const dispatch = useAppDispatch();
  const aniData = useSelector((state: RootState) => state.anime.aniData);
  const totalAni = useSelector((state: RootState) => state.anime.totalAni);
  const currentPage = useSelector((state: RootState) => state.anime.currentPage);
  const showSkeleton = useSelector((state: RootState) => state.anime.showSkeleton);

  const formik = useFormik({
    initialValues: {
      searchTitle: '',
      searchCategories: '',
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    const getData = async () => {
      const { data, count } = await getAnimeData(
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
    <div className="">
      <Navbar/>

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
    </div>
    <ScrollToTopButton />

    </div>
  )
}

export default Home;