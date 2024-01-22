"use client"

import { useParams, useRouter } from 'next/navigation'
import { fetchAuthorById, } from '@/utils';
import { useEffect, useState } from 'react';

import AuthorDetails from './AuthorDetails';

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
        setIsLoading(false);
      }
    };

    fetchData();

  }, [params?.name[1]]);


  return (
    <AuthorDetails author={author} isLoading={isLoading}/>
  );
};

export default BookPage;


/*
import BookDetails from './BookDetails';
import { fetchBookById } from '@/utils';

const fetchData = async (params) => {
  try {
    const book = await fetchBookById(params?.name[1]);
    console.log(book);
    return book;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default async function BookPage({ params }) {
  const book = await fetchData(params);

  if (params?.name?.length !== 2) {
    redirect('/')
  }

  return <BookDetails book={book} />;
}
*/