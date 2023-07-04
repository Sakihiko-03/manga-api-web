import React, { useState, useEffect } from 'react';

const CardAni = (value: { title?: string, status?: string, img?: string, imgModal?: string, story?: string, ratingRank?: string, averageRating?: string }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='flex flex-col lg:flex-row bg-gray-800 rounded-2xl overflow-hidden shadow-md mb-8'>
                <img src={value.img} alt={value.title} />
                <div className='m-8'>
                    <p className='text-lg text-white'>{value.title}</p>
                    <p className='text-gray-500'>Status: {value.status}</p>
                    <button type="button" onClick={() => setShowModal(true)} className='bg-white/30 p-2 rounded-md text-gray-200 hover:bg-gray-400 mt-4'>more info</button>
                </div>
            </div>
            {showModal ? (
                <>
                    <div className='absolute inset-0 z-30'>
                        <div className='flex items-center justify-center w-full h-screen fixed top-0 left-0 overflow-y-auto'>
                            <div className="my-16 mx-4 lg:mx-auto flex flex-col lg:flex-row items-center justify-center p-8 rounded-2xl bg-gray-600 shadow-xl lg:w-3/4">
                                <img src={value.imgModal} alt={value.title} className='rounded-lg mb-4 lg:mb-0 lg:mr-8' />
                                <div className='lg:mr-8 text-gray-300'>
                                    <p className='text-white text-lg'>{value.title}</p>
                                    <p>ratingRank: {value.ratingRank}</p>
                                    <p>averageRating: {value.averageRating}</p>
                                    <p className='text-xs mt-2'>{value.story}</p>
                                    <button type="button" onClick={() => setShowModal(false)} className='bg-white/20 mt-4 p-2 rounded-md text-gray-300 hover:bg-gray-400'>close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed top-0 opacity-50 inset-0 z-10 bg-gray-900 backdrop-blur-md"></div>
                </>
            ) : null}

        </>
    )
}

export default CardAni