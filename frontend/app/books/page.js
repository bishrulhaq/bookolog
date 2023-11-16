"use client"

import { fetchBooks, convertToTitleCase, sanitizedUri } from '@/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'

export default function BooksPage() {
  const [books, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const router = useRouter();

  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? 1;
  const limit = 20;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { total, books } = await fetchBooks(page || 1, limit);
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


  return (
    <div className="flex justify-center items-center py-2">
      <div className="p-6 rounded-lg">
        {isLoading ? (
          <div className="text-center">
            <svg width="100" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
              <circle cx="15" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                  begin="0s" dur="0.8s"
                  values="15;9;15" calcMode="linear"
                  repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                  begin="0s" dur="0.8s"
                  values="1;.5;1" calcMode="linear"
                  repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                <animate attributeName="r" from="9" to="9"
                  begin="0s" dur="0.8s"
                  values="9;15;9" calcMode="linear"
                  repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="0.5" to="0.5"
                  begin="0s" dur="0.8s"
                  values=".5;1;.5" calcMode="linear"
                  repeatCount="indefinite" />
              </circle>
              <circle cx="105" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                  begin="0s" dur="0.8s"
                  values="15;9;15" calcMode="linear"
                  repeatCount="indefinite" />
                <animate attributeName="fill-opacity" from="1" to="1"
                  begin="0s" dur="0.8s"
                  values="1;.5;1" calcMode="linear"
                  repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        ) : books.length !== 0 ? (
          <>
            <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
              Books in the Library
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-screen-xl gap-8 px-4 b-shadow">
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
                                href={`/author/${sanitizedUri(author.name)}/${author.k_id}`}
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
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                      View
                    </button>
                  </Link>

                </div>
              ))}
            </div>
            <div className="flex justify-center items-center mt-10">
              {books.length !== 0 && (
                <div class="flex flex-col items-center">
                  <span class="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">{page || 1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{Math.ceil(total / limit)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button onClick={() => router.push(`/books?page=${parseInt(page || 1) - 1}`)}
                      disabled={parseInt(page || 1) === 1} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-800 dark:text-white dark:bg-gray-800 bg-gray-200 rounded-s hover:bg-gray-900  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-white">
                      <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                      </svg>
                      Prev
                    </button>
                    <button onClick={() => router.push(`/books?page=${parseInt(page || 1) + 1}`)}
                      disabled={parseInt(page || 1) === Math.ceil(total / limit)} class="flex items-center justify-center px-3 h-8 text-sm font-medium  text-gray-800 dark:text-white dark:bg-gray-800 bg-gray-200 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-white">
                      Next
                      <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <h2 className="md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center b-shadow mb-5 md:py-4 py-2">
            No Results Found!
          </h2>
        )}
      </div>
    </div>
  );
};