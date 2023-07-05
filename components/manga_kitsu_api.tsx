import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CardAni from './card';
import Pagination from '@mui/material/Pagination';
import SkeletonCard from './skeleton';

type resultProps = {
  id: string;
  type: string;
  attributes: Attributes;
};

type Attributes = {
  titles: Titles;
  description: string;
  ratingRank: string;
  averageRating: string;
  status: string;
  posterImage: PosterImage;
};

type Titles = {
  en: string;
  en_jp: string;
};

type PosterImage = {
  small: string;
  medium: string;
};

const MangaKitsuAPI = () => {
  const [result, setResult] = useState<resultProps[]>([]);
  const [links, setLinks] = useState<{ first: string; next: string; last: string }>();
  const [countMeta, setCount] = useState<number>(1);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const formik = useFormik({
    initialValues: {
      searchQuery: '',
      searchCategories: '',
      page: 1,
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    fetchMangaData(formik.values.page, formik.values.searchQuery, formik.values.searchCategories);
  }, [formik.values.page, formik.values.searchQuery, formik.values.searchCategories]);

  const fetchMangaData = async (page: number, searchQuery?: string, searchCategories?: string) => {
    try {
      let apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${(page - 1) * 20}`;
      let apiUrlRank = `https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${(page - 1) * 20}&sort=ratingRank`;

      if (searchQuery !== '') {
        apiUrl += `&filter[text]=${searchQuery}`;
        if (searchCategories !== '') {
          apiUrl += `&filter[categories]=${searchCategories}`;
        }
      }
      else if (searchCategories !== '') {
        apiUrl += `&filter[categories]=${searchCategories}`;
        if (searchQuery !== '') {
          apiUrl += `&filter[text]=${searchQuery}`;
        }
      }
      else {
        apiUrl = apiUrlRank
      }

      const response = await fetch(apiUrl);
      const mangaData = await response.json();
      const data = mangaData['data'];
      const meta = mangaData['meta']['count'];
      setCount(meta)
      const links = mangaData['links'];

      if (links && links.last) {
        setLinks(links);
      }

      setResult(data);
      setShowSkeleton(false);

    } catch (error) {
      console.error('Error fetching manga data:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    formik.setFieldValue('page', page);
  };

  return (
    <div className="text-black flex flex-col">

      <p>Search Bar</p>
      <input
        id="searchQuery"
        type="text"
        name="searchQuery"
        placeholder="Title"
        value={formik.values.searchQuery}
        onChange={formik.handleChange}
        className='p-2 rounded-md text-gray-400 mb-8 mt-4'
      />

      <FormControl className='mb-8'>
        <FormLabel className='text-black'>Categories</FormLabel>
        <RadioGroup
          color='transparent'
          row
          aria-label="categories"
          name="searchCategories"
          value={formik.values.searchCategories}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="action" control={<Radio />} label="Action" />
          <FormControlLabel value="fantasy" control={<Radio />} label="Fantasy" />
          <FormControlLabel value="horror" control={<Radio />} label="Horror" />
          <FormControlLabel value="isekai" control={<Radio />} label="Isekai" />
          <FormControlLabel value="demon" control={<Radio />} label="Demon" />
          <FormControlLabel value="sports" control={<Radio />} label="Sports" />
          <FormControlLabel value="music" control={<Radio />} label="Music" />
        </RadioGroup>
      </FormControl>
      {
        showSkeleton ? (
          <SkeletonCard />
        ) : (
          <>
            {links && links.last && (
              <Pagination
                className='mb-8 flex justify-center'
                componentName='page'
                id='page'
                count={Math.ceil(countMeta / 20) ?? 1}
                page={formik.values.page}
                onChange={handlePageChange}
                // onChange={formik.handleChange}
                variant="outlined"
                shape="rounded"
              />
            )}

            <div className='grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-8'>
              {result.map((value) => (
                <div className="text-black" key={value.id}>
                  <CardAni title={value.attributes.titles.en}
                    status={value.attributes.status}
                    img={value.attributes.posterImage.small}
                    imgModal={value.attributes.posterImage.medium}
                    story={value.attributes.description}
                    ratingRank={value.attributes.ratingRank}
                    averageRating={value.attributes.averageRating} />
                </div>
              ))}
            </div>
          </>
        )
      }

    </div>
  );
};

export default MangaKitsuAPI;