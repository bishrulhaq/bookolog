"use client"

import Link from 'next/link';
import { fetchTrendingBooks, sanitizedUri, } from "@/utils";
import React, { useState, useEffect } from 'react';
import { BACKGROUND_GREDIENT } from '@/constants/colors';


const TrendingBooks = () => {

    const [trendingBooks, setTrendingBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const trending = await fetchTrendingBooks();
            setTrendingBooks(trending);
        }

        fetchData();
    }, []);

    return (
        <div className="w-full h-[27rem] overflow-y-auto p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                Trending Books
            </h5>

            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Discover the latest literary sensations in just a few scrolls. Our trending books showcase the most captivating titles that everyone's talking about. Stay in the know with these literary gems.</p>
            <ul className="my-4 space-y-3">
                {trendingBooks.map((book, index) => (
                    <li key={index}>
                        <Link href={`/book/${book.slug}/${book.uuid}`}  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-xl bg-gray-200 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <span className={`inline-flex items-center justify-center px-3 py-2 mr-3 text-xs font-medium text-white ${BACKGROUND_GREDIENT[index ?? 0]} rounded-md`}>{index + 1}</span>
                            <span className="flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis">{book.title.length > 40 ? book.title.slice(0, 40) + '...' : book.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark-text-gray-400">
                    <svg className="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Trending books are based on the views and user demography.
                </a>
            </div>
        </div>
    )
}

export default TrendingBooks;