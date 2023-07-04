import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

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
  ja_jp: string;
};

type PosterImage = {
  tiny: string;
  large: string;
  small: string;
  medium: string;
  original: string;
};

const MangaSearch = () => {
  const [result, setResult] = useState<resultProps[]>([]);
  useEffect(() => {
    fetchMangaData(formik.values.searchQuery);
  }, []);

  const formik = useFormik({
    initialValues: {
      searchQuery: '',
    },
    onSubmit: () => {
    },
  });

  const fetchMangaData = async (searchQuery: string) => {
    try {
      if (searchQuery !== '') {
        const response = await fetch(
          `https://kitsu.io/api/edge/manga?filter[text]=${searchQuery}`
        );
        const mangaData = await response.json();
        const data = mangaData['data'];
        setResult(data);
      } else {
        const response = await fetch(
          'https://kitsu.io/api/edge/manga?sort=-averageRating&popularityRank'
        );
        const mangaData = await response.json();
        const data = mangaData['data'];
        setResult(data);
      }
    } catch (error) {
      console.error('Error fetching manga data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.handleChange(event);
    fetchMangaData(value);
  };

  return (
    <div className="text-black flex flex-col">
      <input
        id="searchQuery"
        type="text"
        name="searchQuery"
        value={formik.values.searchQuery}
        onChange={handleInputChange}
      />
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
