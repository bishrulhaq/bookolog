"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { fetchBooksByISBN, fetchBooksByTitle, fetchBooksByAuthor, navigateToBook, sanitizedUri } from '@/utils';
import Link from 'next/link';

const pageParams = [
  {
    param: 'title',
    title: 'Title',
    description: 'Search by Title',
    value: 0
  },
  {
    param: 'author',
    title: 'Author',
    description: 'Search by Author',
    value: 1
  },
  {
    param: 'isbn',
    title: 'ISBN',
    description: 'Search by ISBN',
    value: 2
  }
];

const SearchedTerm = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const selectedElement = pageParams.find((element) =>
    searchParams.has(element.param)
  );

  useEffect(() => {
    if (!selectedElement) {
      router.push('/');
      return;
    }

    const param = searchParams.get(selectedElement.param);

    if (!param) {
      router.push('/');
      return;
    }

    selectedElement['value'] = param;

    const fetchData = async () => {

      try {
        if (selectedElement.param === 'isbn') {
          const booksByISBN = await fetchBooksByISBN(param);
          setData(booksByISBN);
          setIsLoading(false);
        } else if (selectedElement.param === 'title') {
          const booksByTitle = await fetchBooksByTitle(param);
          setData(booksByTitle);
          setIsLoading(false);
        } else if (selectedElement.param === 'author') {
          const booksByAuthor = await fetchBooksByAuthor(param);
          setData(booksByAuthor);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }

    };

    fetchData();
  }, [selectedElement, searchParams, router]);

  return (
    <div className="flex justify-center items-center py-2">
      <div className="p-6 rounded-lg">
        {isLoading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : selectedElement && data.length !== 0 ? (
          <>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
              Search Results for "{selectedElement?.title}" : "{selectedElement?.value}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
              {data.slice(0, 50).map((data, index) => (
                <div
                  key={index}øø
                  className="bg-gray-200 p-4 rounded-lg border border-gray-300"
                >
                  <Link href={navigateToBook(data?.slug, data?.id)}>
                    <p className="text-lg font-semibold mb-2">{data?.title}</p>
                  </Link>
                  {data?.subtitle && <p className="text-gray-600 mb-2">Sub Title: {data?.subtitle}</p>}
                  {data?.book_uid && <p className="text-gray-600 mb-2">Book ID: {data?.book_uid}</p>}
                  {data?.isbn_10 && <p className="text-gray-600 mb-2">ISBN 10: {data?.isbn_10}</p>}
                  {data?.isbn_13 && <p className="text-gray-600 mb-2">ISBN 13: {data?.isbn_13}</p>}
                  {
                    data?.author_ids && <div className="text-gray-600">
                      Authors: {JSON.parse(data?.author_ids).map((author, index) => (
                        <span key={index}>
                          {author.key ? (
                            <Link href={`/author/${sanitizedUri(author?.name)}/${author?.k_id}`}>
                              {author.name}
                            </Link>
                          ) : (
                            author.name
                          )}
                          {index !== JSON.parse(data.author_ids).length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  }
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-purple-800 text-center">
            No Results Found for "{selectedElement?.title}" : "{selectedElement?.value}"
          </h2>
        )}
      </div>
    </div>
  );
};

export default SearchedTerm;