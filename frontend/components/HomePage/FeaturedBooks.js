import Image from 'next/image';

const FeaturedBooks = () => {
    return (
        <section className="container mx-auto my-8">

            <div className="text-center content-center">
                <p className="bg-green-100 text-green-800 text-xs font-medium inline-flex  px-3 py-3 rounded-lg dark:bg-gray-700 dark:text-green-400 mb-5">
                    <svg className="w-2.5 h-2.5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
                    </svg>
                    Featured Books
                </p>
            </div>

            <h2 className="text-gray-900 text-center dark:text-white text-3xl font-extrabold mb-2">Explore the featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-lg shadow-lg">
                    <Image
                        src="/book1.jpg"
                        alt="Book 1"
                        width={300}
                        height={400}
                        layout="responsive"
                        className="rounded-t-lg"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Book Title 1</h3>
                        <p className="text-gray-600">Author Name</p>
                        <p className="mt-2 text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
                            bibendum dolor.
                        </p>
                        <a href="#" className="block mt-4 text-blue-500 hover:underline">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBooks;