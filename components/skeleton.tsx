import React from 'react'

function SkeletonCard() {
    return (
        <>
            <div className="w-full h-full rounded-xl bg-gray-100/20">
                <div className="bg-gray-300/50 h-60 rounded-md animate-pulse md:h-[450px]"></div>
                <div className="flex animate-pulse m-4 ">
                    <div className="flex flex-col space-y-3 w-full">
                        <div className="w-full bg-gray-300 h-4 rounded-md "></div>
                        <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
                        <div className="flex justify-end pt-8">
                            <div className="w-16 bg-gray-300 h-4 rounded-md "></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SkeletonCardList() {
    const skeletonCards = [];

    for (let i = 0; i < 20; i++) {
        skeletonCards.push(<SkeletonCard key={i} />);
    }

    return <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 w-screen px-6 md:px-36 lg:px-24 xl:px-48'>{skeletonCards}</div>;
}

export default SkeletonCardList;