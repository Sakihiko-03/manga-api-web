import React, { useState, useEffect } from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
type resultProps = {
  id: string;
  type: string;
  attributes: Attributes;
};

type Attributes = {
  titles: Titles;
  posterImage: PosterImage;
};

type Titles = {
  en: string;
  en_jp: string;
};

type PosterImage = {
  large: string;
  small: string;
  medium: string;
};

const MangaSearch = () => {
  const [result, setResult] = useState<resultProps[]>([]);
  const formik = useFormik({
    initialValues: {
      searchQuery: '',
      searchCategories: '',
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    fetchMangaData(formik.values.searchQuery, formik.values.searchCategories);
  }, [formik.values.searchQuery, formik.values.searchCategories]);

  const fetchMangaData = async (searchQuery: string, searchCategories?: string) => {
    try {
      let apiUrl = 'https://kitsu.io/api/edge/manga?sort=-averageRating&popularityRank';

      if (searchQuery !== '') {
        apiUrl = `https://kitsu.io/api/edge/manga?filter[text]=${searchQuery}`;

        if (searchCategories !== '') {
          apiUrl += `&filter[categories]=${searchCategories}`;
        }
      }

      const response = await fetch(apiUrl);
      const mangaData = await response.json();
      const data = mangaData['data'];
      setResult(data);
    } catch (error) {
      console.error('Error fetching manga data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
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
        onChange={handleInputChange}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">CATEGORIES</FormLabel>
        <RadioGroup
          row
          aria-label="categories"
          name="searchCategories"
          value={formik.values.searchCategories}
          onChange={handleInputChange}
        >
          <FormControlLabel value="action" control={<Radio />} label="Action" />
          <FormControlLabel value="adventure" control={<Radio />} label="Adventure" />
          <FormControlLabel value="sports" control={<Radio />} label="Sports" />
          <FormControlLabel value="music" control={<Radio />} label="Music" />
        </RadioGroup>
      </FormControl>

      <div>
        {result.map((value) => (
          <div className="text-black" key={value.id}>
            <div>{value.id}</div>
            <div>{value.type}</div>
            <div>{value.attributes.titles.en}</div>
            <img src={value.attributes.posterImage.small} alt={value.attributes.titles.en} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaSearch;