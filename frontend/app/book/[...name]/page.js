"use client"
import { useParams, useRouter } from 'next/navigation'
import { fetchBookById } from '@/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BookPage() {
  const router = useRouter();
  const params = useParams();
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

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


  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


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
            <div className="py-2 px-4 mx-auto max-w-screen-xl gap-1 px-4 lg:flex">
              <div className="lg:w-3/12 xl:w-25/100 px-4 mt-5 text-center">
                <Image src={`https://books.google.com/books/content?id=${book?.book_uid}&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api`}
                  alt={book?.title}
                  width={500}
                  height={700}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAK8CAIAAACWV9pBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNEMjk0QzU0NzhEMDExRUVCREYwRTEzMjAzQzE2RDJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNEMjk0QzU1NzhEMDExRUVCREYwRTEzMjAzQzE2RDJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0QyOTRDNTI3OEQwMTFFRUJERjBFMTMyMDNDMTZEMkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0QyOTRDNTM3OEQwMTFFRUJERjBFMTMyMDNDMTZEMkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JxZS6AAAHhklEQVR42uzUQREAAAjDMMC/56EDLpHQRztJAfDLSABg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuEgCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5i7BADmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gDcsQIMAN6qCHV2Tu4dAAAAAElFTkSuQmCC"
                  className='rounded-lg b-shadow' />
              </div>
              <div className="lg:w-8/12 xl:w-75/100 px-4 mt-5">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{toTitleCase(book?.title)}</h2>
                <div className="items-center py-2 my-2 text-base font-bold text-gray-900">
                  {book?.views > 0 && (<span className="inline-flex items-center justify-center px-2 py-0.5 mx-3 mb-3 text-xs font-medium text-white bg-gradient-darkgoldenrod rounded">Views : {book?.views}</span>)}
                  {
                    book?.author_ids != null && typeof book?.author_ids === 'string' &&
                    JSON.parse(book?.author_ids)?.map((author, index, authorsArray) => (
                      <div key={index} className="whitespace-wrap mx-3">
                        {author?.key ? <a href={`/author/${author?.key}`} className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">{toTitleCase(author?.name)}</a> :
                          <span className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400">{toTitleCase(author?.name)}</span>}
                        {index !== authorsArray.length - 1 && (
                          <span className="mx-2">,</span>
                        )}
                      </div>
                    ))
                  }
                </div>
      
                {book?.subtitle && (<p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{toTitleCase(book?.subtitle)} <hr className='hr-fade' /></p>)}
                {book?.description && (<div className="mb-6 md:text-lg dark:text-gray-400 text-justify" dangerouslySetInnerHTML={{ __html: book?.description }}></div>)}
                <p className="text-gray-600 mb-2">ISBN 10: {book?.isbn_10} ISBN 13: {book?.isbn_13}</p>
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