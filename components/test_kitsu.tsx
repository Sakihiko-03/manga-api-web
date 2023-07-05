import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import CardAni from './card';
import Pagination from '@mui/material/Pagination';

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

const MangaSearch2 = () => {
    const [result, setResult] = useState<resultProps[]>([]);
    const [countMeta, setCount] = useState<number>(0);
    const [links, setLinks] = useState<{ first: string; next: string; last: string } | undefined>(undefined);
    
    const formik = useFormik({
        initialValues: {
            searchQuery: '',
            searchCategories: '',
            page: 1,
        },
        onSubmit: () => { },
    });

    useEffect(() => {
        fetchMangaData(formik.values.page);
    }, [formik.values.page]);

    const fetchMangaData = async (page: number) => {
        try {
            let apiUrl = `https://kitsu.io/api/edge/manga?page[limit]=20&page[offset]=${(page - 1) * 20}&sort=ratingRank`;

            const response = await fetch(apiUrl);
            const mangaData = await response.json();
            const data = mangaData['data'];
            const meta = mangaData['meta']['count'];
            //   alert(meta)
            setCount(meta);

            const links = mangaData['links'];

            if (links && links.last) {
                setLinks(links);
            }
            setResult(data);
        } catch (error) {
            console.error('Error fetching manga data:', error);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        formik.setFieldValue('page', page);
    };

    return (
        <div className="text-black flex flex-col">
            {links && links.last && (
                <Pagination
                    count={Math.ceil(countMeta / 20) ?? 0}
                    page={formik.values.page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            )}
            {links && links.last && (
        <Pagination
        className='mb-8'
          componentName='page'
          id='page'
          count={Math.ceil(countMeta / 20) ?? 1}
          page={formik.values.page}
          onChange={formik.handleChange}
          variant="outlined"
          shape="rounded"
        />
      )}
            <div className='grid grid-cols-2 gap-4 lg:gap-8'>
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
        </div>
    );
};

export default MangaSearch2;
