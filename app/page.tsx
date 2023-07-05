'use client'
import { useFormik, Formik, Form, Field } from 'formik';
import MangaSearch from '@/components/kitsu';
import Pagination from '@mui/material/Pagination';
import usePagination from '@mui/material/usePagination';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MangaSearch2 from '@/components/test_kitsu';
import MangaKitsuAPI from '@/components/manga_kitsu_api';


export default function Home() {
  const formik = useFormik({
    initialValues: {
      page: '',
    },
    onSubmit: () => {},
  });
 
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-16 bg-gray-300">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm">
        <div className="">
          {/* <MangaSearch /> */}
          {/* <MangaSearch2 /> */}
          <MangaKitsuAPI />
        </div>
      </div>
    </main>
  )
}
