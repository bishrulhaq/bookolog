"use client"

import {fetchBooks, convertToTitleCase, sanitizedUri, truncateText} from '@/utils';
import React, {useEffect, useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

export default function BooksPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1;
    const limit = 20;

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBook] = useState([]);
    const [total, setTotal] = useState(1);
    const [activeMenu, setMenuActive] = useState(false);

    const [activeSideMenu, setSideMenuActive] = useState({
        year: false, category: false
    });

    function toggleMenu() {
        setMenuActive(!activeMenu);
    }

    const updateSideMenuValue = (key, newValue) => {
        setSideMenuActive(prevState => {
            return {...prevState, [key]: newValue};
        });
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const {total, books} = await fetchBooks(page, limit);
                setTotal(total);
                setBook(books);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return (<div>
        <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">

            <div class="fixed inset-0 bg-black bg-opacity-25"></div>

            <div class="fixed inset-0 z-40 flex">
                <div
                    class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div class="flex items-center justify-between px-4">
                        <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                        <button type="button"
                                class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>


                    <form class="mt-4 border-t border-gray-200">
                        <h3 class="sr-only">Categories</h3>
                        <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                            <li>
                                <a href="#" class="block px-2 py-3">Totes</a>
                            </li>
                            <li>
                                <a href="#" class="block px-2 py-3">Backpacks</a>
                            </li>
                            <li>
                                <a href="#" class="block px-2 py-3">Travel Bags</a>
                            </li>
                            <li>
                                <a href="#" class="block px-2 py-3">Hip Bags</a>
                            </li>
                            <li>
                                <a href="#" class="block px-2 py-3">Laptop Sleeves</a>
                            </li>
                        </ul>

                        <div class="border-t border-gray-200 px-4 py-6">
                            <h3 class="-mx-2 -my-3 flow-root">
                                <button type="button"
                                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                                        aria-controls="filter-section-mobile-0" aria-expanded="false">
                                    <span class="font-medium text-gray-900">Published In</span>
                                    <span class="ml-6 flex items-center">
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                                                 onClick={() => updateSideMenuValue('year', true)}
                                                 aria-hidden="true"><path
                                                d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                                            </svg>
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                                                 aria-hidden="true"
                                                 onClick={() => updateSideMenuValue('year', false)}>
                                            <path fill-rule="evenodd"
                                                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        </span>
                                </button>
                            </h3>

                            {activeSideMenu.year && (

                                <div class="pt-6" id="filter-section-mobile-0">
                                    <div class="space-y-6">
                                        <div className="flex items-center">
                                            <input id="filter-mobile-color-0" name="color[]" value="white"
                                                   type="checkbox"
                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                            <label htmlFor="filter-mobile-color-0"
                                                   className="ml-3 min-w-0 flex-1 text-gray-500">Last 2
                                                Years</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="filter-mobile-color-1" name="color[]" value="beige"
                                                   type="checkbox"
                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                            <label htmlFor="filter-mobile-color-1"
                                                   className="ml-3 min-w-0 flex-1 text-gray-500">Last 4
                                                Years</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="filter-mobile-color-2" name="color[]" value="blue"
                                                   type="checkbox"
                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                            <label htmlFor="filter-mobile-color-2"
                                                   className="ml-3 min-w-0 flex-1 text-gray-500">Last 5
                                                Years</label>
                                        </div>
                                    </div>
                                </div>)}

                        < /div>
                        <div class="border-t border-gray-200 px-4 py-6">
                            <h3 class="-mx-2 -my-3 flow-root">

                                <button type="button"
                                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                                        aria-controls="filter-section-mobile-1" aria-expanded="false">
                                    <span class="font-medium text-gray-900">Category</span>
                                    <span class="ml-6 flex items-center">
                                    <svg onClick={() => updateSideMenuValue('category', true)} class="h-5 w-5"
                                         viewBox="0 0 20 20" fill="currentColor"
                                         aria-hidden="true"><path
                                        d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/></svg>

                                    <svg onClick={() => updateSideMenuValue('category', false)} class="h-5 w-5"
                                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                          clip-rule="evenodd"/>
                                    </svg>
                                    </span>
                                </button>
                            </h3>

                            {activeSideMenu.category && (<div class="pt-6" id="filter-section-mobile-1">
                                <div class="space-y-6">
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-0" name="category[]"
                                               value="science"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-0"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Science</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-1" name="category[]"
                                               value="history"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-1"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">History</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-2" name="category[]"
                                               value="politics"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-2"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Politics</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-3" name="category[]"
                                               value="religion"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-3"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Religion</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-4" name="category[]"
                                               value="education"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-4"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Education</label>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                <h1 class="text-4xl font-bold dark:text-white tracking-tight text-gray-900">Explore Books</h1>

                <div class="flex items-center">
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button"
                                    onClick={toggleMenu}
                                    class="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900"
                                    id="menu-button" aria-expanded="false" aria-haspopup="true">
                                Sort
                                <svg
                                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>

                        {activeMenu && (<div
                            class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <a href="#" class="font-medium text-gray-900 block px-4 py-2 text-sm"
                                   role="menuitem" tabindex="-1" id="menu-item-0">Most Liked</a>
                                <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                   tabindex="-1" id="menu-item-1">Most Viewed</a>
                                <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem"
                                   tabindex="-1" id="menu-item-2">Top Commented</a>
                            </div>
                        </div>)}

                    </div>

                    <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                        <span class="sr-only">View grid</span>
                        <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button type="button"
                            class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                        <span class="sr-only">Filters</span>
                        <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>

            <section aria-labelledby="products-heading" class="pb-24 pt-6">
                <h2 id="products-heading" class="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form class="hidden lg:block">
                        <div className="border-b border-gray-200 py-6">
                            <h3 class="-my-3 flow-root">

                                <button type="button"
                                        class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
                                        aria-controls="filter-section-0" aria-expanded="false">
                                    <span class="font-medium text-gray-900 dark:text-white">Published In</span>
                                    <span class="ml-6 flex items-center">

                                        <svg onClick={() => updateSideMenuValue('year', true)} class="h-5 w-5"
                                             viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true">
                                            <path
                                                d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                                        </svg>
                                        <svg onClick={() => updateSideMenuValue('year', false)} class="h-5 w-5"
                                             viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true"><path fill-rule="evenodd"
                                                                      d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                                                      clip-rule="evenodd"/></svg>
                                        </span>
                                </button>
                            </h3>

                            {activeSideMenu.year && (<div className="pt-6" id="filter-section-0">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input id="filter-mobile-color-0" name="color[]" value="white"
                                               type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label htmlFor="filter-mobile-color-0"
                                               className="ml-3 min-w-0 flex-1 text-gray-500">Last 2 Years</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="filter-mobile-color-1" name="color[]" value="beige"
                                               type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label htmlFor="filter-mobile-color-1"
                                               className="ml-3 min-w-0 flex-1 text-gray-500">Last 4 Years</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="filter-mobile-color-2" name="color[]" value="blue"
                                               type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <label htmlFor="filter-mobile-color-2"
                                               className="ml-3 min-w-0 flex-1 text-gray-500">Last 5 Years</label>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        <div className="border-b border-gray-200 py-6">
                            <h3 class="-my-3 flow-root">
                                <button type="button"
                                        class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
                                        aria-controls="filter-section-1" aria-expanded="false">
                                    <span class="font-medium text-gray-900 dark:text-white">Category</span>
                                    <span class="ml-6 flex items-center">
                                            <svg onClick={() => updateSideMenuValue('category', true)} class="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor"
                                                 aria-hidden="true">
                                                <path
                                                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                                            </svg>
                                            <svg onClick={() => updateSideMenuValue('category', false)} class="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor"
                                                 aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                      d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </span>
                                </button>
                            </h3>
                            {activeSideMenu.category && (<div className="pt-6" id="filter-section-1">
                                <div className="space-y-4">
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-0" name="category[]"
                                               value="science"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 dark:text-white text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-0"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Science</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-1" name="category[]"
                                               value="history"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 dark:text-white text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-1"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">History</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-2" name="category[]"
                                               value="politics"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 dark:text-white text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-2"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Politics</label>
                                    </div>
                                    <div class="flex items-center">
                                        <input id="filter-mobile-category-3" name="category[]"
                                               value="religion"
                                               type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 dark:text-white text-indigo-600 focus:ring-indigo-500"/>
                                        <label for="filter-mobile-category-3"
                                               class="ml-3 min-w-0 flex-1 text-gray-500">Religion</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="filter-mobile-category-4" name="category[]"
                                               value="education"
                                               type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 dark:text-white text-indigo-600 focus:ring-indigo-500"/>
                                        <label htmlFor="filter-mobile-category-4"
                                               className="ml-3 min-w-0 flex-1 text-gray-500">Education</label>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </form>

                    <div className="lg:col-span-3">
                        {isLoading ? (<div className="text-center flex content-center align-middle">
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
                                                      repeatCount="indefinite"/>
                                </path>
                            </svg>
                        </div>) : books && books.length !== 0 ? (<>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-screen-xl gap-8 px-4">
                                {books.map((book) => (<Link key={book.id} href={`/book/${book.slug}/${book.uuid}`}
                                                            className="bg-white rounded-2xl shadow-md flex flex-col hover:bg-amber-100 hover:shadow-xl">

                                    <div className="relative h-[300px] rounded-t-2xl overflow-hidden">
                                        <Image
                                            src={`https://books.google.com/books/content?id=${book.book_uid}&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api`}
                                            alt={book.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="px-4 py-5 flex-grow">
                                        <h3 className="text-xl font-semibold">{truncateText(convertToTitleCase(book.title), 35)}</h3>
                                        <p className="text-gray-600">
                                            {book.author_ids != null && typeof book.author_ids === 'string' && (JSON.parse(book.author_ids).map((author, index, authorsArray) => (
                                                <span key={index}>{author.key ? (
                                                    <a href={`/author/${sanitizedUri(author.name)}/${author.k_id}`}
                                                       className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">{convertToTitleCase(author.name)}</a>) : (
                                                    <span
                                                        className="text-yellow-500 hover:text-yellow-600 dark:hover-text-yellow-400">{convertToTitleCase(author.name)}</span>)}
                                                    {index !== authorsArray.length - 1 &&
                                                        <span className="mx-2">,</span>}</span>)))}
                                        </p>
                                        {book.subtitle && (
                                            <p className="mt-2 text-gray-700">{truncateText(convertToTitleCase(book.subtitle), 30)}</p>)}
                                    </div>

                                </Link>))}
                            </div>
                            <div className="flex justify-center items-center mt-10">
                                <div className="flex flex-col items-center">
                                        <span className="text-sm text-gray-700 dark:text-gray-400">Showing <span
                                            className="font-semibold text-gray-900 dark:text-white">{page || 1}</span> to <span
                                            className="font-semibold text-gray-900 dark:text-white">{Math.ceil(total / limit)}</span> of <span
                                            className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries</span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            onClick={() => router.push(`/books?page=${parseInt(page || 1) - 1}`)}
                                            disabled={parseInt(page || 1) === 1}
                                            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-800 dark:text-white dark:bg-gray-800 bg-gray-200 rounded-s hover:bg-gray-900  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-white">
                                            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2"
                                                      d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                            </svg>
                                            Prev
                                        </button>
                                        <button
                                            onClick={() => router.push(`/books?page=${parseInt(page || 1) + 1}`)}
                                            disabled={parseInt(page || 1) === Math.ceil(total / limit)}
                                            className="flex items-center justify-center px-3 h-8 text-sm font-medium  text-gray-800 dark:text-white dark:bg-gray-800 bg-gray-200 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-white">
                                            Next
                                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2"
                                                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>) : (
                            <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
                                No Results Found!
                            </h2>)}
                    </div>
                </div>
            </section>
        </main>
    </div>)
}