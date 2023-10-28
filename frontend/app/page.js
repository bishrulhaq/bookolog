import HomePage from '@/components/HomePage'
import { fetchBooks } from "@/utils";

export default async function App({ searchParams }) {
  const books = await fetchBooks();

  return (
    <div className="mx-auto max-width mt-4 py-5 px-5 lg:mx-10">
      <HomePage books={books} />
    </div>
  );
}

