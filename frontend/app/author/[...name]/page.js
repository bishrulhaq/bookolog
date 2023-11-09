
"use client"
import { useParams, useRouter } from 'next/navigation'
import { fetchAuthorById, convertToTitleCase, sanitizedUri } from '@/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BookPage = () => {
  const router = useRouter();
  const params = useParams();
  const [author, setAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (params?.name?.length !== 2 || isNaN(params?.name[1])) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const book = await fetchAuthorById(params?.name[1]);
        setAuthor(book);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();

  }, [params?.name[1]]);


  return (
    <div className="flex mx-auto justify-center items-center py-2">

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
      ) : author.length !== 0 ? (
        <>
          <div classNameName="max-w-3xl mx-auto rounded-lg shadow-lg lg:flex">
            <div className="p-4">
              {/* <img src="author-image.jpg" alt="Author Name" className="w-32 h-32 rounded-full mx-auto mb-4"> */}
              <h1 className="text-2xl font-semibold text-center dark:text-white">{author?.name}</h1>
              <p className="text-gray-600 text-center dark:text-white">{author?.biography}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-2">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  {author?.birth_year && (
                    <>
                      <p className="text-gray-600 dark:text-white">Born</p>
                      <p className="text-lg font-semibold dark:text-white">{author?.birth_year}</p>
                    </>
                  )}
                </div>
                <div>
                  {author?.death_year && (
                    <>
                      <p className="text-gray-600 dark:text-white">Died</p>
                      <p className="text-lg font-semibold dark:text-white">{author?.death_year}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Trending Book of {author?.name}</h2>
              <div class="container mx-auto">
                <div class="flex flex-wrap -mx-4">
                  {author?.books.map((book) => (
                    <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4 flex">
                      <Link href={`/book/${book.slug}/${book.uuid}`} class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                        <div class="relative pb-48 overflow-hidden">
                          <Image
                            src={`https://books.google.com/books/content?id=${book.book_uid}&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api`}
                            alt={book.title}
                            class="absolute inset-0 h-full w-full object-cover"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div class="p-4">
                          <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Views : {book.views}</span>
                          <h2 class="mt-2 mb-2  font-bold">{convertToTitleCase(book.title)}</h2>
                          {book.subtitle && (
                            <p class="text-sm">{convertToTitleCase(book.subtitle)}</p>
                          )}
                        </div>
                        <div class="p-4 border-t border-b text-xs text-gray-700">
                          <span class="flex items-center mb-1">
                            {book.description && (
                              <p className="text-sm text-justify overflow-hidden overflow-ellipsis line-clamp-3" dangerouslySetInnerHTML={{ __html: book?.description }}></p>
                            )}
                          </span>
                        </div>
                        {/* <div class="p-4 flex items-center text-sm text-gray-600">
                            <span class="ml-2">34 Bewertungen</span>
                          </div> */}
                      </Link>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
          Something went wrong!
        </h2>
      )}
    </div>
  );
};

export default BookPage;