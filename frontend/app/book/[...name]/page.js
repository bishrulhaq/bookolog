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