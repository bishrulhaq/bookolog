"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchHomeScreenGenres, sanitizedUri } from '@/utils';
import { BACKGROUND_GREDIENT } from '@/constants/colors';

const GenreCarousel = () => {

  const [data, setData] = useState([]);
  const slidesContainerRef = useRef(null);
  const slideRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const slidesContainer = slidesContainerRef.current;
    const slide = slideRef.current;
    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;

    const fetchData = async () => {

      try {
        const data = await fetchHomeScreenGenres();
        setIsLoading(false);
        setData(data);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    }

    fetchData();

    if (slidesContainer && slide && prevButton && nextButton) {
      const slideWidth = slide.clientWidth;

      const handleNextClick = () => {
        slidesContainer.scrollLeft += slideWidth;
      };

      const handlePrevClick = () => {
        slidesContainer.scrollLeft -= slideWidth;
      };

      nextButton.addEventListener("click", handleNextClick);
      prevButton.addEventListener("click", handlePrevClick);


      return () => {
        // Clean up event listeners
        nextButton.removeEventListener("click", handleNextClick);
        prevButton.removeEventListener("click", handlePrevClick);
      };
    }
  }, [isLoading]);


  return (
    <>
      {isLoading ? (<div className="flex justify-center items-center py-2">
        <div className="p-6 rounded-lg">
          <div className="text-center">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="40px" height="40px" viewBox="0 0 40 40" space="preserve">
              <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
              <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.5s"
                  repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>
      </div>) :
        data.length !== 0 && (
          <div className="mx-auto px-4 py-4 md:px-8 transition-all duration-500 ease-linear">
            <div className="relative">
              <div ref={slidesContainerRef} className="slides-container flex snap-x snap-mandatory overflow-hidden overflow-x-auto space-x-2 rounded scroll-smooth">
                {data.map((item, index) => (
                  <div ref={slideRef} className="slide flex-shrink-0 snap-center rounded overflow-hidden" key={index}>
                    <Link href={'genre/'+ sanitizedUri(item.category_title)}>
                      <div className={`max-w-sm inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${BACKGROUND_GREDIENT[item?.background_color ?? 0]}`}>
                        {item?.category_title}

                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 -left-2 h-full items-center flex">
                <button role="button" ref={prevButtonRef} className="prev px-2 py-2 rounded-full bg-gradient-gray text-neutral-900 group" aria-label="prev"></button>
              </div>
              <div className="absolute top-0 -right-2 h-full items-center flex">
                <button role="button" ref={nextButtonRef} className="next px-2 py-2  rounded-full bg-gradient-gray text-neutral-900 group" aria-label="next"></button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default GenreCarousel;