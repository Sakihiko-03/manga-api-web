import { Box, Skeleton } from '@mui/material'
import React from 'react'

function SkeletonCard() {
    return (
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-3'>
            {Array.from(Array(12)).map((_, index) => (
                <>
                    <Box sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}>
                        <Skeleton key={index} className='rounded-xl' animation="wave" variant="rounded" width={220} height={450} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
                        <Skeleton key={index} className='rounded-xl' animation="wave" variant="rounded" width={290} height={520} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
                        <Skeleton key={index} className='rounded-xl' animation="wave" variant="rounded" width={345} height={600} />
                    </Box>
                </>
            ))}
        </div>
    )
}

export default SkeletonCard