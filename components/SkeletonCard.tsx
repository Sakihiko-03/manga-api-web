import React from 'react'

const SkeletonCard = () => {
    return (
        <>
            <div className='w-full h-full rounded-xl overflow-hidden bg-gray-100/20'>
                <div className='bg-gray-300/50 h-96 animate-pulse md:h-[420px] lg:h-[400px]'></div>
                <div className='flex animate-pulse m-4'>
                    <div className='flex flex-col space-y-3 w-full'>
                        <div className='w-full bg-gray-300 h-4 rounded-md'></div>
                        <div className='w-24 bg-gray-300 h-4 rounded-md'></div>
                        <div className='flex justify-end pt-8'>
                            <div className='w-16 bg-gray-300 h-4 rounded-md'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const SkeletonCardList = () => {
    let skeletonCards = [];

    for (let i = 0; i < 20; i++) {
        skeletonCards.push(<SkeletonCard key={i} />);
    }

    return <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 w-screen px-6 md:px-32 lg:px-24 xl:px-48'>{skeletonCards}</div>;
}

export default SkeletonCardList;