'use client'
import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Card, Button, CardActionArea, CardActions, CardMedia, CardContent, Typography, Pagination } from '@mui/material';
import { useFormik, Formik, Form, Field } from 'formik';
import axios from 'axios';

// พวกนี้มันต้องมีไหมนะ?
type AniData = {
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

export default function Home() {
  const [AniData, setAniData] = useState<AniData[]>([]);
  const [Links, setLinks] = useState([]);
  const [TotalAni, setTotalAni] = useState(0);

  // copy อันเดิมมาก่อน
  const formik = useFormik({
    initialValues: {
      searchTitle: '',
      searchCategories: '',
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    GetAnimeData(formik.values.searchTitle, formik.values.searchCategories);
  }, [formik.values.searchTitle, formik.values.searchCategories]);

  // ลองใช้ axios ตามพี่พลอย
  const GetAnimeData = async (searchTitle?: string, searchCategories?: string) => {
    try {
      // เปิดมาอยากให้แสดงตาม ratingRank เฉยๆ แต่มัน & หลายรอบไม่ได้
      const apiRank = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
      let api = `https://kitsu.io/api/edge/anime`;
      if (searchTitle !== '' && searchCategories !== '') {
        api += `?filter[text]=${searchTitle}&filter[categories]=${searchCategories}`;
      }
      else if (searchTitle !== '') {
        api += `?filter[text]=${searchTitle}`;
        if (searchCategories !== '') {
          api += `?filter[categories]=${searchCategories}`;
        }
      }
      else if (searchCategories !== '') {
        api += `?filter[categories]=${searchCategories}`;
        if (searchTitle !== '') {
          api += `?filter[text]=${searchTitle}`;
        }
      }
      else {
        api = apiRank;
      }
      const response = await axios.get(api);

      // const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${searchTitle}&filter[categories]=${searchCategories}`);
      // const response = await axios.get(`https://kitsu.io/api/edge/anime?sort=ratingRank&filter[text]=${searchTitle}`);
      // console.log(response.data);
      // console.log(response.data.data);

      if (response.status === 200) {
        // show 10
        const data = response.data.data;
        setAniData(data);
        // มี first prev next last
        const links = response.data.links;
        setLinks(links);
        // จำนวน anime 19288
        const count: number = response.data.meta;
        setTotalAni(count);
      }
    } catch (error) {
      console.error(error);
    }

  }
  // พี่พลอยแนะนำให้เขียนแบบ prop value ไว้เดี๋ยวลองไปดู
  const CardAnime = () => {
    return (
      <>
        {AniData.map((data) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height=""
                image={data.attributes.posterImage.small}
                alt={data.attributes.titles.en}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {data.attributes.titles.en}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  status: {data.attributes.status}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                info
              </Button>
            </CardActions>
          </Card>
        ))}
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col gap-8 items-center p-4 lg:p-16 bg-gray-300">
      <TextField
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
      <Pagination count={10} variant="outlined" shape="rounded" />
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
        <CardAnime />
      </div>
    </div>
  )
}

