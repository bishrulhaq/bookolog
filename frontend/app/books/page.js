"use client"

import { fetchBooks, convertToTitleCase } from '@/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BooksPage() {
  const [books, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const books = await fetchBooks();
        setBook(books);
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