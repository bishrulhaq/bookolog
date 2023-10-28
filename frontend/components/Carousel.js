"use client"

import { useState, useEffect } from 'react';

const Carousel = () => {
    const images = [
        '/images/one.png',
        '/images/two.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle the next slide
    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    // Function to handle the previous slide
    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    // Function to automatically slide every few seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change the duration as needed (in milliseconds)

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    return (
        <div className="relative">
            <div className="w-full h-[23.3rem]">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full ${index === currentIndex ? 'block' : 'hidden'
                            } transition-opacity duration-500`}
                    >
                        <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="hidden">Previous</span>
                </span>
            </button>

            <button onClick={nextSlide} type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="hidden">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
