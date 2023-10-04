"use client"

import React, { useState, useEffect } from 'react';
import { fetchAllGenres } from '@/utils';
import { BACKGROUND_GREDIENT } from '@/constants/colors';

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
                    <div className="text-center">
                        <p>Loading...</p>
                    </div>
                ) : genres.length !== 0 ? (
                    <>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
                            Explore all the Genres
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
                            {genres.slice(0, 50).map((genre, index) => (
                                <div
                                    key={index}
                                    className={`${BACKGROUND_GREDIENT[genre?.background_color ?? 0]} p-4 rounded-lg border border-gray-300`}>
                                    <p className="text-lg font-semibold mb-2">{genre?.category_title}</p>
                                    <p className="text-gray-600 mb-2">Description: {genre?.description}</p>
                                    <p className="text-gray-600 mb-2">URL: {genre?.book_uid}</p>
                                </div>
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