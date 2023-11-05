"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import { fetchBooksByGenre, removeHyphensAndTitleCase, convertToTitleCase } from '@/utils';
import Link from 'next/link';
import Image from 'next/image';

const GenreByTitle = () => {
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);
    const { genre } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const booksByGenre = await fetchBooksByGenre(removeHyphensAndTitleCase(genre));
                setGenreName(removeHyphensAndTitleCase(genre));
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
            <div className="px-6 rounded-lg">
                {isLoading ? (
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
                ) : books.length !== 0 ? (
                    <>
                        <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
                            Books in the {genreName} Genre
                        </h2>

                        <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-screen-xl gap-8 px-4 b-shadow">
                            {books.map((book) => (
                                <div key={book.id} className="bg-white rounded-lg shadow-lg flex flex-col">
                                    <div className="relative h-[400px] rounded-t-lg overflow-hidden">
                                        <Image
                                            src={`https://books.google.com/books/content?id=${book.book_uid}&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api`}
                                            alt={book.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="px-4 py-5 flex-grow">
                                        <h3 className="text-xl font-semibold">{convertToTitleCase(book.title)}</h3>
                                        <p className="text-gray-600">
                                            {book.author_ids != null && typeof book.author_ids === 'string' && (
                                                JSON.parse(book.author_ids).map((author, index, authorsArray) => (
                                                    <span key={index}>
                                                        {author.key ? (
                                                            <a
                                                                href={`/author/${author.key}`}
                                                                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                                                            >
                                                                {convertToTitleCase(author.name)}
                                                            </a>
                                                        ) : (
                                                            <span className="text-yellow-500 hover:text-yellow-600 dark:hover-text-yellow-400">
                                                                {convertToTitleCase(author.name)}
                                                            </span>
                                                        )}
                                                        {index !== authorsArray.length - 1 && <span className="mx-2">,</span>}
                                                    </span>
                                                ))
                                            )}
                                        </p>
                                        {book.subtitle && (
                                            <p className="mt-2 text-gray-700">{convertToTitleCase(book.subtitle)}</p>
                                        )}
                                    </div>

                                    <Link href={`/book/${book.slug}/${book.uuid}`} className="flex justify-center pb-2">
                                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                            Learn More
                                        </button>
                                    </Link>

                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
                        No Results Found for {genreName} Genre
                    </h2>
                )}
            </div>
        </div>
    );
};

export default GenreByTitle;