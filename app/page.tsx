'use client'
import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Card, Button, CardActionArea, CardActions, CardMedia, CardContent, Typography, Pagination, Modal } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useFormik, Formik, Form, Field } from 'formik';
import axios from 'axios';
import ScrollToTopButton from '@/components/button_to_top';

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
  const [TotalAni, setTotalAni] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const formik = useFormik({
    initialValues: {
      searchTitle: '',
      searchCategories: '',
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    GetAnimeData(currentPage, formik.values.searchTitle, formik.values.searchCategories);
  }, [currentPage, formik.values.searchTitle, formik.values.searchCategories]);

  // ลองใช้ axios ตามพี่พลอย
  const GetAnimeData = async (page: number, searchTitle?: string, searchCategories?: string) => {
    try {
      // const apiRank = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
      let api = `https://kitsu.io/api/edge/anime`;

      // pagination chat gpt มามันเลื่อน offset เอา
      const offset = (page - 1) * 20;
      api += `?page[limit]=20&page[offset]=${offset}`;

      // TextField before Radio
      if (searchTitle !== '') {
        api += `&filter[text]=${searchTitle}`;
        if (searchCategories !== '') {
          api += `&filter[categories]=${searchCategories}`;
        }
      }

      // Radio before TextField
      else if (searchCategories !== '') {
        api += `&filter[categories]=${searchCategories}`;
        if (searchTitle !== '') {
          api += `&filter[text]=${searchTitle}`;
        }
      }

      else {
        api += `&sort=ratingRank`;
      }

      const response = await axios.get(api);

      if (response.status === 200) {
        const data = response.data.data;
        setAniData(data);
        // มี first prev next last แต่ใช้ยังไงวะเนี่ยยยย
        const links = response.data.links;
        setLinks(links);
        const count = response.data.meta.count;
        setTotalAni(count);
      }
    } catch (error) {
      console.error(error);
    }

  }

  const CardAnime = () => {
    return (
      <>
        {AniData.map((data) => (
          <Card key={data.id} sx={{ maxWidth: 345 }}>
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
              <ModalBox value={data.attributes} />
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
      <Pagination
        count={Math.ceil(TotalAni / 20)}
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
        shape="rounded" />
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
        <CardAnime />
      </div>
      <ScrollToTopButton />
    </div>
  )
}

function ModalBox(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.value.titles.en}
        </DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height=""
            image={props.value.posterImage.medium}
            alt={props.value.titles.en}
          />
          <DialogContentText id="alert-dialog-description">
            {props.value.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}