
"use client"

import { useParams, useRouter } from 'next/navigation'
import { fetchAuthorById } from '@/utils';
import { useEffect, useState } from 'react';

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

    <div className="bg-gray-100 font-sans">
      <div className="container mx-auto p-8">

        {isLoading ? (
          <div classNameName="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <p>Loading...</p>
            </div>
          </div>
        ) : author.length !== 0 ? (
          <>
            <div classNameName="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
              <div className="p-4">
                {/* <img src="author-image.jpg" alt="Author Name" className="w-32 h-32 rounded-full mx-auto mb-4"> */}
                <h1 className="text-2xl font-semibold text-center">{author?.name}</h1>
                <p className="text-gray-600 text-center">{author?.biography}</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-2">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-gray-600">Born</p>
                    <p className="text-lg font-semibold">{author?.birth_year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Died</p>
                    <p className="text-lg font-semibold">{author?.death_year}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Books by Author</h2>
                <ul>
                  <li className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">Book Title 1</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">Book Title 2</a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">Book Title 3</a>
                  </li>
                </ul>
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