import Link from "next/link"

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-10 mt-2">
      <header className="bg-blue-500 text-white py-6">
        <div className="container mx-auto text-center b-shadow">
          <h1 className="text-3xl font-bold">About Bookolog</h1>
          <p className="mt-2">A space for users to explore books, add them to their personal bookshelf, and effectively organize and track their book collection.</p>
        </div>
      </header>
      
      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link href="/">
            <p className="hover:underline">Home</p>
          </Link>
          <Link href="/books">
            <p className="hover:underline">My Bookshelf</p>
          </Link>
        </div>
      </nav>
      
      <section className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="mt-2 text-gray-700">Bookolog is a platform designed for book lovers. Our mission is to provide you with a space to explore the world of books, build your personal library, and keep track of your reading journey. Whether you're an avid reader, a casual book enthusiast, or someone looking to discover new books, Bookolog has something to offer for everyone.</p>
      </section>
      
      <section className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          <li>Explore a vast collection of books across genres.</li>
          <li>Add books to your personal bookshelf.</li>
          <li>Organize and categorize your book collection.</li>
          <li>Track your reading progress and set reading goals.</li>
          <li>Connect with a community of fellow bookworms.</li>
        </ul>
      </section>
      
      <section className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="mt-2 text-gray-700">If you have any questions, suggestions, or feedback, please feel free to <Link href="/contact"><span className="text-blue-500 hover:underline">contact us</span></Link>. We value your input and are here to assist you in any way we can.</p>
      </section>
    </div>
  );
}

export default AboutPage;