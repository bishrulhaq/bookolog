import HomePage from '@/components/HomePage'
import Link from 'next/link'
import { fetchBooks } from "@/utils";

export default async function App({ searchParams }) {
  const books = await fetchBooks();

  return (
    <div className="mx-auto max-width mt-4 py-5 px-5">
      <h1>Book Explorer</h1>
      <Link href="/about">
        <button className="border border-black font-bold">About</button>
      </Link>

      <HomePage books={books} />
    </div>
  );
}

