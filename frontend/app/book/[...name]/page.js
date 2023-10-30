
"use client"
import { useParams, useRouter } from 'next/navigation'
import { fetchBookById } from '@/utils';
import { useEffect, useState } from 'react';

const BookPage = () => {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    console.log(params?.name);

    if (params?.name?.length !== 2) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const book = await fetchBookById(params?.name[1]);
        setBook(book);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();

  }, [params?.name[1]]);


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
        ) : book.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4">
              <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
                <p className="text-lg font-semibold mb-2">{book?.title}</p>
                <p className="text-gray-600 mb-2">Sub Title: {book?.subtitle}</p>
                <p className="text-gray-600 mb-2">Book ID: {book?.book_uid}</p>
                <p className="text-gray-600 mb-2">ISBN 10: {book?.isbn_10}</p>
                <p className="text-gray-600">ISBN 13: {book?.isbn_13}</p>
              </div>

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

export default BookPage;