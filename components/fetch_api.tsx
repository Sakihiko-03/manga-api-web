'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { useFormik } from 'formik';

// Define the type for the anime result
type resultProps = {
  id: string;
  type: string;
  attributes: Attributes;
};

// Define the type for the anime attributes
type Attributes = {
  // Other attribute properties...
  titles: Titles;
  posterImage: PosterImage;
};

// Define the type for the anime titles
type Titles = {
  en: string;
  en_jp: string;
  ja_jp: string;
};

// Define the type for the anime poster image
type PosterImage = {
  tiny: string;
  large: string;
  small: string;
  medium: string;
  original: string;
};

const AniListData = () => {
  const [result, setResult] = useState<resultProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const res = await fetch("https://kitsu.io/api/edge/manga?sort=-averageRating&popularityRank");
      const jsonData = await res.json();
      const data = jsonData['data']
      setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>AniListData</div>
      <div className="">
        <div>
          {result.map((value) => {
            return (
              <div className='text-black'>
                <div>{value.id}</div>
                <div>{value.type}</div>
                <div>{value.attributes.titles.en}</div>
            <img src={value.attributes.posterImage.small} alt={value.attributes.titles.en} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default AniListData