'use client'
import Image from 'next/image'
import { Formik } from 'formik';
import MangaSearch from '@/components/kitsu';
import CardAni from '@/components/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 lg:p-24 bg-gray-300">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="">
          <MangaSearch />
        </div>
      </div>
    </main>
  )
}
