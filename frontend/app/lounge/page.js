"use client"

import LoungeSidebar from "@/components/Lounge/LoungeSidebar";
import {useSession} from "next-auth/react"
import {useEffect, useState} from "react";
import Link from "next/link";


const DummyBookCard = ({ title, image, author, genre }) => {
    return (
        <div className="mb-4 py-2 px-2">
            <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-2" />
            <h3 className="text-lg font-semibold mb-1 dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{author}</p>
            <p className="text-gray-500 dark:text-gray-300">{genre}</p>
        </div>
    );
};

const UserProfile = ({ name, location, posts, nudge, following, profilePic }) => {
    return (
        <div className="bg-white rounded-lg p-10 flex items-center dark:bg-gray-900 shadow-xl">
            <img
                className="h-32 w-32 bg-white p-2 rounded-full shadow mr-4"
                src={profilePic}
                alt={name}
            />
            <div className="flex flex-col justify-center">
                <p className="font-semibold mb-2 dark:text-white">{name}</p>
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
                    {location}
                </div>
                <div className="flex gap-2 my-3">
                    <div className="font-semibold text-center dark:text-white">
                        <p className="text-black dark:text-white">{posts}</p>
                        <span className="text-gray-400">Posts</span>
                    </div>
                    <div className="font-semibold text-center dark:text-white">
                        <p className="text-black dark:text-white">{nudge}</p>
                        <span className="text-gray-400">Nudge</span>
                    </div>
                    <div className="font-semibold text-center dark:text-white">
                        <p className="text-black dark:text-white">{following}</p>
                        <span className="text-gray-400">Following</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Lounge() {

    const {data: session, status, update} = useSession();
    const [selectedItem, setSelectedItem] = useState('Exchange');
    const [formData, setFormData] = useState({
        search_book: "", type: "", location: "", exchangeWith: "", exchange_book: "", genres: ""
    });

    const userProfileData = {
        name: "Bishrul Haq",
        location: "Uva, Sri Lanka",
        posts: 102,
        nudge: 102,
        following: 102,
        profilePic: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png",
    };


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

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

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


    return (<>
        <main
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-2 max-w-screen-xl container px-2 mx-auto sticky duration-500 pt-3">
            <aside className="sticky">
                <UserProfile {...userProfileData} />

                <div className="mt-6">
                    {/* Trending Books */}
                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Trending Books</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {trendingBooks.map((book) => (
                                <DummyBookCard
                                    key={book.id}
                                    title={book.volumeInfo.title}
                                    image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                    author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                    genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Most Viewed Books</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {mostViewedBooks.map((book) => (
                                <DummyBookCard
                                    key={book.id}
                                    title={book.volumeInfo.title}
                                    image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                    author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                    genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-lg p-4 mb-4 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Latest Picks Nearby</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {latestPicksNearby.map((book) => (
                                <DummyBookCard
                                    key={book.id}
                                    title={book.volumeInfo.title}
                                    image={book.volumeInfo.imageLinks?.thumbnail || "default_image_url"}
                                    author={book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                    genre={book.volumeInfo.categories?.join(", ") || "Unknown Genre"}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <article className="lg:col-span-2 b-shadow">

                <div>
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

                    {selectedItem === 'Exchange' && (<form
                        className="bg-white shadow rounded-lg mb-6 p-4 dark:bg-gray-900"
                        onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a
                                Description</label>
                            <textarea
                                name="add"
                                value={formData.describe}
                                onChange={handleChange}
                                placeholder="Describe"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Book</label>
                            <input
                                type="text"
                                id="search"
                                value={formData.search_book}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Book..." required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Exchange based
                                on </label>
                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select Type</option>
                                <option value="books">Books</option>
                                <option value="genres">Genres</option>

                            </select>
                        </div>


                        {formData.type === "genres" && (<>
                            <input
                                type="text"
                                name="Filter Genres"
                                value={formData.genres}
                                onChange={handleChange}
                                placeholder="Filter by Genres"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </>)}

                        {formData.type === "books" && (<>
                            <input
                                type="text"
                                id="search"
                                value={formData.exchange_book}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Book..." required/>
                        </>)}

                        <footer className="flex justify-between mt-2">
                            <div className="flex gap-2 text-sm">
                                <span
                                    className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         className="css-i6dzq1">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span className="h-8 pt-1.5 dark:text-white">
                                        Sri Lanka
                                </span>

                            </div>
                            <button
                                className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                                Create Exchange
                            </button>
                        </footer>
                    </form>)}
                    {selectedItem === 'Sell' && (<form
                        className="bg-white shadow rounded-lg mb-6 p-4 dark:bg-gray-900"
                        onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a
                                Description</label>
                            <textarea
                                name="add"
                                value={formData.describe}
                                onChange={handleChange}
                                placeholder="Describe"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Book</label>
                            <input
                                type="text"
                                id="search"
                                value={formData.search_book}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Book..." required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input
                                type="text"
                                name="Price"
                                placeholder="Enter an amount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Condition</label>
                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Select Type</option>
                                <option value="used">Used</option>
                                <option value="new">New</option>

                            </select>
                        </div>

                        <footer className="flex justify-between mt-2">
                            <div className="flex gap-2 text-sm">
                                <span
                                    className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         className="css-i6dzq1">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span className="h-8 pt-1.5 dark:text-white">
                                        Sri Lanka
                                </span>

                            </div>
                            <button
                                className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                                Create Offer
                            </button>
                        </footer>
                    </form>)}
                    {selectedItem === 'Looking For' && (<form
                        className="bg-white shadow rounded-lg mb-6 p-4 dark:bg-gray-900"
                        onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a
                                Description</label>
                            <textarea
                                name="add"
                                value={formData.describe}
                                onChange={handleChange}
                                placeholder="Describe"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="search"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Book</label>
                            <input
                                type="text"
                                id="search"
                                value={formData.search_book}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Book..." required/>
                        </div>

                        <footer className="flex justify-between mt-2">
                            <div className="flex gap-2 text-sm">
                                <span
                                    className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         className="css-i6dzq1">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </span>
                                <span className="h-8 pt-1.5 dark:text-white">
                                        Sri Lanka
                                </span>

                            </div>
                            <button
                                className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">
                                Create Offer
                            </button>
                        </footer>
                    </form>)}
                </div>

                <div
                    className="font-semibold mb-2 mx-3 px-2 py-2 text-center bg-white rounded-lg dark:text-white dark:bg-blue-950">
                    Latest Posts
                </div>


                <div className="bg-white shadow rounded-lg mt-5 dark:bg-gray-900">
                    <div className="flex flex-row px-2 py-3 mx-3">
                        <div className="w-auto h-auto rounded-full border-2 border-green-500 dark:border-amber-400">
                            <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                                 alt="User avatar"
                                 src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"/>

                        </div>
                        <div className="flex flex-col mb-2 ml-4 mt-1">
                            <div className="text-gray-600 text-sm font-semibold dark:text-white">Lucas Jhonathan</div>
                            <div className="flex w-full mt-1">
                                <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer ">
                                    Sri Lanka, Badulla
                                </div>
                                <div className="text-gray-400 font-thin text-xs dark:text-gray-200">
                                    • 1 day ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-100 dark:border-none"></div>
                    <div className="font-semibold mb-2 mt-2 mx-3 px-2 dark:text-white">
                        Selling <Link href="" className="text-amber-800">Focus</Link>
                    </div>
                    <div className="bg-amber-200 rounded-lg px-2 py-2 m-5">
                        <span className="text-sm mb-2 px-2">Condition <Link href="" className="text-cyan-600">New</Link></span>
                        <span className="text-sm mb-2 px-2">Selling for <Link href=""
                                                                              className="text-cyan-600">Negotiable</Link></span>
                    </div>
                    <div className="text-gray-500 text-sm mb-6 mx-3 px-2">I am looking for Tiny Habits book, if
                        anyone has it nudge.
                    </div>
                    <div className="flex w-full border-t border-gray-100 dark:border-none">
                        <div className="mt-3 mx-5 flex flex-row text-xs">
                            <div
                                className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Nudge:
                                <div className="ml-1 text-gray-400 text-ms"> 30</div>
                            </div>
                        </div>
                        <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                            <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div
                                className="ml-1 text-gray-400 text-ms"> 120k</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                        <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                             alt="User avatar"
                             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"/>
                        <input type="text"
                               className="dark:rounded-lg w-full py-2 pl-4  pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                               placeholder="Nudge..." autoComplete="off"/>

                    </div>
                </div>

                <div className="bg-white shadow rounded-lg mt-5 dark:bg-gray-900">
                    <div className="flex flex-row px-2 py-3 mx-3">
                        <div className="w-auto h-auto rounded-full border-2 border-green-500 dark:border-amber-400">
                            <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                                 alt="User avatar"
                                 src="https://images.unsplash.com/photo-1611695434369-a8f5d76ceb7b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D;w=200&amp;q=200"/>

                        </div>
                        <div className="flex flex-col mb-2 ml-4 mt-1">
                            <div className="text-gray-600 text-sm font-semibold dark:text-white">Derek Suneeth</div>
                            <div className="flex w-full mt-1">
                                <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer ">
                                    Sri Lanka, Badulla
                                </div>
                                <div className="text-gray-400 font-thin text-xs dark:text-gray-200">
                                    • 1 day ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-100 dark:border-none"></div>
                    <div className="font-semibold mb-2 mx-3 px-2 dark:text-white">
                        Looking For <Link href="" className="text-amber-800">Focus</Link>
                    </div>
                    <div className="text-gray-500 text-sm mb-6 mx-3 px-2">I am looking for Focus, if
                        anyone has it nudge.
                    </div>
                    <div className="flex w-full border-t border-gray-100 dark:border-none">
                        <div className="mt-3 mx-5 flex flex-row text-xs">
                            <div
                                className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Nudge:
                                <div className="ml-1 text-gray-400 text-ms"> 30</div>
                            </div>
                        </div>
                        <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                            <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div
                                className="ml-1 text-gray-400 text-ms"> 120k</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                        <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                             alt="User avatar"
                             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"/>
                        <input type="text"
                               className="dark:rounded-lg w-full py-2 pl-4  pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                               placeholder="Nudge..." autoComplete="off"/>
                        <select
                            name="type"
                            id="type"
                            className="dark:rounded-lg w-full py-2 pl-4 ml-2 pr-10 text-sm bg-gray-100 border border-transparent ring-blue-500 rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                        >
                            <option value="">Select Condition</option>
                            <option value="used">Used</option>
                            <option value="new">New</option>
                        </select>
                        <input type="text"
                               className="dark:rounded-lg w-25 ml-2 py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                               placeholder="Offer..." autoComplete="off"/>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg mt-5 dark:bg-gray-900">
                    <div className="flex flex-row px-2 py-3 mx-3">
                        <div className="w-auto h-auto rounded-full border-2 border-green-500 dark:border-amber-400">
                            <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                                 alt="User avatar"
                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D;w=200&amp;q=200"/>
                        </div>
                        <div className="flex flex-col mb-2 ml-4 mt-1">
                            <div className="text-gray-600 text-sm font-semibold dark:text-white">Ema Dank</div>
                            <div className="flex w-full mt-1">
                                <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer ">
                                    Sri Lanka, Badulla
                                </div>
                                <div className="text-gray-400 font-thin text-xs dark:text-gray-200">
                                    • 1 day ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-100 dark:border-none"></div>
                    <div className="font-semibold mb-2 mx-3 px-2 dark:text-white">
                        Exchange <Link href="" className="text-amber-800">Focus</Link> for <Link href=""
                                                                                                 className="text-amber-800">Atomic
                        Habbits</Link>
                    </div>
                    <div className="text-gray-500 text-sm mb-6 mx-3 px-2">Need Atomic Habits, Nudge if you have the
                        book and if you're near the area, The condition of the book is not bad
                    </div>
                    <div className="flex w-full border-t border-gray-100 dark:border-none">
                        <div className="mt-3 mx-5 flex flex-row text-xs">
                            <div
                                className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Nudge:
                                <div className="ml-1 text-gray-400 text-ms"> 30</div>
                            </div>
                        </div>
                        <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                            <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div
                                className="ml-1 text-gray-400 text-ms"> 120k</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                        <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                             alt="User avatar"
                             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"/>
                        <span className="">

                            </span>
                        <input type="text"
                               className="dark:rounded-lg dark:text-black w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                               placeholder="Nudge..." autoComplete="off"/>
                    </div>
                </div>

            </article>

        </main>
    </>)
}