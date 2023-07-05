'use client'
import React, { useState, useEffect } from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'

const ScrollToTopButton = () => {
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 50) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='flex justify-end fixed bottom-0 right-0'>
            {showBtn && (
                <ArrowUpCircleIcon
                    onClick={scrollToTop}
                    className='my-16 mx-8 h-10 w-10 cursor-pointer text-slate-400/80 dark:text-slate-300/80 hover:text-slate-500 dark:hover:text-slate-200'
                />
            )}
        </div>
    );
};

export default ScrollToTopButton;