// Breadcrumbs.js
"use client"
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation'
import {useEffect, useState} from "react";
import {fetchQuote} from "@/utils";


const Breadcrumbs = () => {

    const pathname = usePathname();
    const [quote, setQuote] = useState();

    useEffect(() => {

        const getQuote = async () => {
            try {
                const quote = await fetchQuote();
                setQuote(quote?.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (pathname === '/') {
            getQuote();
        }

    }, [pathname]);

    return (<nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-4"
        aria-label="Breadcrumb">
        {pathname === '/' ? (<ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
                <p className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-white">
                    🫸🏼Quote of the Day <span className='pl-2 text-blue-600'>{quote?.quote} ~ {quote?.author}</span>
                </p>
            </li>
        </ol>) : (<ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
                <Link href="/"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    Home
                </Link>
            </li>
            <li>
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link href="/templates"
                          className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        Templates
                    </Link>
                </div>
            </li>
            <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span
                        className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
                </div>
            </li>
        </ol>)}
    </nav>);
};

export default Breadcrumbs;
