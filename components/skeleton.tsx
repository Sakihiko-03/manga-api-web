import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function SkeletonCard() {
    return (
        <>
            <div className='ml-4 md:ml-8 lg:ml-8'>
                <div className='m-4 pb-4 flex justify-center lg:mb-8'>
                    <Skeleton animation="wave" variant="rounded" width={420} height={40} />
                </div>

                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 2, lg: 2 }}>
                    {Array.from(Array(10)).map((_, index) => (
                        <Grid xs={2} sm={4} md={8} lg={2} xl={6} key={index} >
                            <Box sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}>
                                <div className='m-2'>
                                    <Skeleton animation="wave" variant="rounded" height={600} />
                                </div>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
                                <div className='m-2'>
                                    <Skeleton animation="wave" variant="rounded" height={400} />
                                </div>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
                                <div className='m-4'>
                                    <Skeleton animation="wave" variant="rounded" height={400} />
                                </div>
                            </Box>

                        </Grid>
                    ))}
                </Grid>
            </div>

        </>
    );
}