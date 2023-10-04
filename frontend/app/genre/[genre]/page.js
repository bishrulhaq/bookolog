"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import { fetchBooksByGenre, uriToTitle, navigateToBook } from '@/utils';
import Link from 'next/link';

const GenreByTitle = () => {
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);
    const { genre } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const booksByGenre = await fetchBooksByGenre(uriToTitle(genre));
                setGenreName(uriToTitle(genre));
                setBooks(booksByGenre);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();

    }, [genre]);

    return (
        <div className="flex justify-center items-center py-2">
            <div className="p-6 rounded-lg">
                {isLoading ? (
                    <div className="text-center">
                        <p>Loading...</p>
                    </div>
                ) : books.length !== 0 ? (
                    <>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
                            Books in the {genreName} Genre
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
                            {books.slice(0, 50).map((data, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 p-4 rounded-lg border border-gray-300"
                                >
                                    <Link href={navigateToBook(data?.slug, data?.id)}>
                                        <p className="text-lg font-semibold mb-2">{data?.title}</p>
                                    </Link>
                                    <p className="text-gray-600 mb-2">Sub Title: {data?.subtitle}</p>
                                    <p className="text-gray-600 mb-2">Book ID: {data?.book_uid}</p>
                                    <p className="text-gray-600 mb-2">ISBN 10: {data?.isbn_10}</p>
                                    <p className="text-gray-600">ISBN 13: {data?.isbn_13}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
                        No Results Found for {genreName} Genre
                    </h2>
                )}
            </div>
        </div>
    );
};

export default GenreByTitle;