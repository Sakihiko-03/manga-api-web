'use client'
import { useFormik, Formik, Form, Field } from 'formik';
import MangaSearch from '@/components/kitsu';
import Pagination from '@mui/material/Pagination';
import usePagination from '@mui/material/usePagination';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MangaSearch2 from '@/components/test_kitsu';
import MangaKitsuAPI from '@/components/manga_kitsu_api';
import ScrollToTopButton from '@/components/button_to_top';
import SkeletonCard from '@/components/skeleton';


export default function Home() {

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-16 bg-gray-300">
      <div className="z-10 p-4 w-full max-w-7xl items-center justify-between font-mono text-sm">
        <div className="">
        {/* <SkeletonCard/> */}
          {/* <MangaSearch /> */}
          {/* <MangaSearch2 /> */}
          <MangaKitsuAPI />
          <ScrollToTopButton/>
        </div>
      </div>
    </main>
  )
}
