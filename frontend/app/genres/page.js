"use client"

import React, { useState, useEffect } from 'react';
import { fetchAllGenres, convertToTitleCase, sanitizedUri } from '@/utils';
import { BACKGROUND_GREDIENT } from '@/constants/colors';
import Link from 'next/link';

const GenreByTitle = () => {
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const genres = await fetchAllGenres();
                setGenres(genres);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();


    }, []);

    return (
        <div className="flex justify-center items-center py-2">
            <div className="p-6 rounded-lg">
                {isLoading ? (
                    <div className="flex justify-center items-center py-2">
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
                    </div>
                ) : genres.length !== 0 ? (
                    <>
                        <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
                            Explore all the Genres
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
                            {genres.slice(0, 50).map((genre, index) => (
                                <Link  href={'/genre/' + sanitizedUri(genre.category_title)}>
                                    <div
                                        key={index}
                                        className={`${BACKGROUND_GREDIENT[genre?.background_color ?? 0]} p-4 rounded-lg b-shadow`}>
                                        <p className="text-lg font-semibold mb-2">{convertToTitleCase(genre?.category_title)}</p>
                                        {
                                            genre?.description && <p className="text-gray-600 mb-2">{genre?.description}</p>
                                        }
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
                        Something went wrong!
                    </h2>
                )}
            </div>
        </div>
    );
};

export default GenreByTitle;