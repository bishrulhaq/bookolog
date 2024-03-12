"use client"
import React, {Suspense, useEffect, useRef, useState} from "react";
import Link from "next/link";
import ExchangeBooks from "@/app/lounge/exchangeBooks";
import Notification from "@/components/Notification";
import SellBooks from "@/app/lounge/SellBooks";
import Timeline from "@/app/lounge/timeline";


const DummyBookCard = ({title, image, author, genre}) => {
    return (<div className="mb-4 py-2 px-2">
        <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-2"/>
        <h3 className="text-lg font-semibold mb-1 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{author}</p>
        <p className="text-gray-500 dark:text-gray-300">{genre}</p>
    </div>);
};
export default function Lounge({user}) {

    const [selectedItem, setSelectedItem] = useState('Exchange');
    const [formData, setFormData] = useState({
        search_book: "", type: "", location: "", exchangeWith: "", exchange_book: "", genres: ""
    });
    const [notification, setNotification] = useState(null);

    const API_URL = process.env.API_URL;


    const [trendingBooks, setTrendingBooks] = useState([]);
    const [mostViewedBooks, setMostViewedBooks] = useState([]);
    const [latestPicksNearby, setLatestPicksNearby] = useState([]);

    useEffect(() => {
        const fetchBooks = async (url, setter) => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                setter(data.items || []);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        const baseUrl = "https://www.googleapis.com/books/v1/volumes";

        // Fetch trending books
        fetchBooks(`${baseUrl}?q=programming&orderBy=newest&maxResults=4`, setTrendingBooks);

        // Fetch most viewed books
        fetchBooks(`${baseUrl}?q=data%20science&orderBy=newest&maxResults=4`, setMostViewedBooks);

        // Fetch latest picks nearby
        fetchBooks(`${baseUrl}?q=nonfiction&orderBy=newest&maxResults=4`, setLatestPicksNearby);
    }, []);


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };


    return (<>
        <main
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-2 max-w-screen-xl container px-2 mx-auto sticky duration-500 pt-3">
            <aside className="sticky">
                <div className="bg-white rounded-lg p-10 flex items-center dark:bg-gray-900 shadow-xl">
                    <img
                        className="h-32 w-32 bg-white p-2 rounded-full shadow mr-4"
                        src={`${API_URL}/images/profile_picture/${user?.profile_pic ?? 'default.jpg'}`}
                        alt={user?.name}
                    />
                    <div className="flex flex-col justify-center">
                        <p className="font-semibold mb-2 dark:text-white">{user?.name}</p>
                        <div className="text-sm leading-normal text-gray-400 flex items-center dark:text-white">
                            <svg
                                viewBox="0 0 24 24"
                                className="mr-1"
                                width="16"
                                height="16"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {user?.country_code}
                        </div>
                        <div className="flex gap-2 my-3">
                            <div className="font-semibold text-center dark:text-white">
                                <p className="text-black dark:text-white"></p>
                                <span className="text-gray-400">Posts</span>
                            </div>
                            <div className="font-semibold text-center dark:text-white">
                                <p className="text-black dark:text-white"></p>
                                <span className="text-gray-400">Nudge</span>
                            </div>
                            <div className="font-semibold text-center dark:text-white">
                                <p className="text-black dark:text-white"></p>
                                <span className="text-gray-400">Following</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    {/* Trending Books */}
                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Trending Books</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {trendingBooks.map((book) => (<DummyBookCard
                                key={book.id}
                                title={book.volumeInfo.title}
                                image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                            />))}
                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Most Viewed Books</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {mostViewedBooks.map((book) => (<DummyBookCard
                                key={book.id}
                                title={book.volumeInfo.title}
                                image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                            />))}
                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Latest Picks Nearby</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {latestPicksNearby.map((book) => (<DummyBookCard
                                key={book.id}
                                title={book.volumeInfo.title}
                                image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                            />))}
                        </div>
                    </div>
                </div>
            </aside>

            <article className="lg:col-span-2">
                {notification && <Notification message={notification.message} type={notification.type}
                                               duration={notification.duration}/>}
                <Suspense fallback={<div className="text-center">
                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         width="40px" height="40px" viewBox="0 0 40 40" space="preserve">
                        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                                              attributeName="transform"
                                              type="rotate"
                                              from="0 20 20"
                                              to="360 20 20"
                                              dur="0.5s"
                                              repeatCount="indefinite"/>
                        </path>
                    </svg>
                </div>}>

                    {user?.country_code != null ? (<div>
                        <ul className="flex flex-wrap bg-white rounded-lg mb-6 p-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:bg-gray-900">
                            <li className="me-2">
                                <a
                                    href="#"
                                    className={`inline-block px-4 py-3 rounded-lg  ${selectedItem === 'Exchange' ? 'text-white bg-blue-600' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                                    onClick={() => handleItemClick('Exchange')}
                                >
                                    Exchange
                                </a>
                            </li>
                            <li className="me-2">
                                <a
                                    href="#"
                                    className={`inline-block px-4 py-3 rounded-lg  ${selectedItem === 'Sell' ? 'text-white bg-blue-600' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                                    onClick={() => handleItemClick('Sell')}
                                >
                                    Sell
                                </a>
                            </li>
                            <li className="me-2">
                                <a
                                    href="#"
                                    className={`inline-block px-4 py-3 rounded-lg  ${selectedItem === 'Looking For' ? 'text-white bg-blue-600' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}
                                    onClick={() => handleItemClick('Looking For')}
                                >
                                    Looking For
                                </a>
                            </li>
                        </ul>

                        {selectedItem === 'Exchange' && (
                            <ExchangeBooks setNotification={setNotification} user={user}/>)}
                        {selectedItem === 'Sell' && (<SellBooks setNotification={setNotification} user={user}/>)}
                    </div>) : (<div>
                        <div className="bg-amber-100 rounded-lg px-1 py-2 m-5">
                            <Link href="/settings?section=user_details" className="text-cyan-600">
                                <span
                                    className="text-sm mb-2 px-2">Complete the User Profile to access the dashboard</span>
                            </Link>

                        </div>
                    </div>)}

                </Suspense>

                <Timeline user={user}></Timeline>

            </article>

        </main>
    </>)
}