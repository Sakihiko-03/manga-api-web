'use client'
import Image from 'next/image'
// import AniListData from '@/components/anilist_data'
import { Formik } from 'formik';
import MangaSearch from '@/components/kitsu';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        {/* <div className='text-black'>
          <h1>My Form</h1>
          <Formik
            initialValues={{ name: 'jared' }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  name="name"
                />
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        </div> */}
        <div className="">

          <MangaSearch />
          {/* <AniListData /> */}
        </div>
      </div>



    </main>
  )
}
