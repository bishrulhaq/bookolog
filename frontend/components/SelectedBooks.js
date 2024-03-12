import {fetchBookByIdForListing, fetchBooksByTitle, truncateText} from "@/utils";
import React, {useEffect, useRef, useState} from "react";
import useDebounce from "@/components/useDebounce";

const SelectedBooks = ({bookCount = 1, onSelectedBooksChange, reset }) => {

    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const debouncedSearch = useDebounce(query, 300)
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchBarRef = useRef(null);

    const addBook = async (result) => {
        setIsLoading(true);
        const book = await fetchBookByIdForListing(result?.id)
        if (book.status === 200) {
            setIsLoading(false);
            const insertBook = {...result, book_id: book.data?.id}
            setSelectedBooks([...selectedBooks, insertBook]);
            setSearchResults([]);
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (debouncedSearch) {
            if (debouncedSearch.length > 0 && !debouncedSearch.startsWith(' ')) {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearch])


    useEffect(() => {
        if (onSelectedBooksChange) {
            onSelectedBooksChange(selectedBooks);
        }
    }, [selectedBooks]);


    const resetComponent = () => {
        setQuery('');
        setSearchResults([]);
        setSelectedBooks([]);
    };

    useEffect(() => {
        if (reset) {
            resetComponent();
        }
    }, [reset]);


    const handleSearch = async () => {
        const trimmedQuery = query.trim();

        try {
            if (trimmedQuery.length >= 2) {
                const data = await fetchBooksByTitle(trimmedQuery);
                setSearchResults(data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {

        }
    }


    return (<>
        {isLoading ? (<div className="flex justify-center items-center py-2">
            <div className="p-6 rounded-lg">
                <div className="text-center dark:text-white">
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
                </div>
            </div>
        </div>) : (<div className="mb-5">
            {selectedBooks.length !== bookCount && (<>
                <label htmlFor="search"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search
                    Book</label>
                <input
                    type="text"
                    id="search"
                    ref={searchBarRef}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Book..." required/>

                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                        {searchResults.map((result, index) => (<div key={index}
                                                                    className="cursor-pointer bg-white rounded-xl shadow-md p-4 flex flex-col flex-grow my-3">
                            {result?.image && <img src={result?.image} alt={result.title}
                                                   className="h-30 w-full object-cover rounded-xl"/>}
                            <p className="text-base font-medium text-gray-900 mt-2">{truncateText(result.title, 30)}</p>
                            {result.subtitle || result.description ? (
                                <p className="text-sm text-gray-500">{truncateText(result.subtitle || result.description, 20)}</p>) : null}
                            <button
                                id="add-book"
                                name="add-book"
                                onClick={async () => await addBook(result)}
                                className="bg-teal-950 dark:bg-blue-950 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl mt-auto">
                                select
                            </button>
                        </div>))}
                    </div>
                </div>
            </>)}


            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                    {selectedBooks?.map((result, book_index) => (<div key={book_index}
                                                                      className="cursor-pointer bg-white rounded-xl shadow-md p-2 flex flex-col flex-grow my-3">
                        <div className="flex justify-end">
                            <button id="dropdownButton"
                                    onClick={() => setSelectedBooks((prevBooks) => prevBooks.filter((_, index) => index !== book_index))}
                                    className=" inline-block px-1 py-1 rounded-3xl text-white text-sm hover:bg-red-900 bg-red-950"
                                    type="button">
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                     className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>

                            </button>
                        </div>
                        {result?.image && <img src={result?.image} alt={result.title}
                                               className="h-30 w-full object-cover rounded-xl"/>}
                        <p className="text-base font-medium text-gray-900 mt-2">{truncateText(result.title, 30)}</p>
                        {result.subtitle || result.description ? (
                            <p className="text-sm text-gray-500">{truncateText(result.subtitle || result.description, 20)}</p>) : null}
                    </div>))}
                </div>
            </div>
        </div>)}
    </>)

}

export default SelectedBooks;