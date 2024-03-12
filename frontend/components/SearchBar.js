"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import useDebounce from '@/components/useDebounce';
import ThemeChanger from '@/components/ThemeChanger';
import { fetchBooksByTitle, fetchBooksByAuthor, fetchBooksByISBN, sanitizedUri, truncateText, navigateToBook } from '@/utils';

const SearchBar = () => {

  const router = useRouter()
  const dropdownRef = useRef(null)
  const searchBarRef = useRef(null);

  const [query, setQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState('Title')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(query, 300)


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSearchBarClick = (e) => {
    e.stopPropagation();
    setIsSearchDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
        setIsSearchDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (debouncedSearch) {
      if (debouncedSearch.length > 0 && !debouncedSearch.startsWith(' ')) {
        handleSearch();
      } else {
        setSearchResults([]);
        setIsSearchDropdownOpen(false);
      }
    } else {
      setSearchResults([]);
      setIsSearchDropdownOpen(false);
    }
  }, [debouncedSearch])


  const handleSearch = async () => {

    const trimmedQuery = query.trim();

    try {
      if (selectedOption === 'Title' && trimmedQuery.length >= 2) {
        const data = await fetchBooksByTitle(trimmedQuery);
        setSearchResults(data);

        setIsSearchDropdownOpen(true)
      } else if (selectedOption === 'ISBN' && trimmedQuery.length >= 2) {
        const data = await fetchBooksByISBN(trimmedQuery);
        setIsSearchDropdownOpen(true)

        setSearchResults(data);
      } else if (selectedOption === 'Author' && trimmedQuery.length >= 2) {
        const data = await fetchBooksByAuthor(trimmedQuery);
        setSearchResults(data);

        setIsSearchDropdownOpen(true)
      } else {
        setIsSearchDropdownOpen(false);
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function navigateToSearch() {
    try {
      if (selectedOption === 'Title') {
        router.push(`/search?title=${sanitizedUri(query)}`, { searchByTitle: query })
      } else if (selectedOption === 'ISBN') {
        router.push(`/search?isbn=${sanitizedUri(query)}`, { isbn: query })
      } else if (selectedOption === 'Author') {
        router.push(`/search?author=${sanitizedUri(query)}`, { searchByAuthor: query })
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      <div className="bg-primary-600 pt-3">
        <div className="flex items-center justify-center pb-3">
          <div className="z-20 relative ml-2" ref={dropdownRef}>
            <input type="search" id="searchBar"
              placeholder={`Search by ${selectedOption}`}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onClick={handleSearchBarClick}
              ref={searchBarRef}
              className="block lg:w-92 md:-72 z-30 text-sm px-5 py-2.5 text-gray-900 bg-gray-50 text-primary-500 placeholder-primary-200 lg:w-96 md:w-72 flex rounded-lg bg-primary-400 focus:outline-none focus:bg-gray-900" />
            <button type="submit" onClick={handleSearch} className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-gold-500 hover:bg-gray-900 rounded-r-lg"><svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            </button>
            {isSearchDropdownOpen && (
              <div id="searchDropDown" className="z-30 translate-y-1/3" >
                <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
                  {isLoading && <p>Loading...</p>}
                  {!isLoading && searchResults.length > 0 && (
                    searchResults.map((result, index) => (
                      <Link key={index} href={navigateToBook(result?.slug, result?.id)}>
                        <div className="cursor-pointer py-2 px-3 hover:bg-slate-100">
                          <p className="text-sm font-medium text-gray-900">{result.title}</p>
                          {result.subtitle || result.description ? (
                            <p className="text-sm text-gray-500">{truncateText(result.subtitle || result.description, 45)}</p>
                          ) : null}
                        </div>
                      </Link>
                    ))
                  )}
                  {searchResults.length > 1 && (
                    <div className="cursor-pointer py-2 px-3 hover:bg-slate-100 bg-gray-200" onClick={navigateToSearch}>
                      <p className="text-sm font-medium text-center">Explore all 😜</p>
                      <p className="text-sm text-gray-500 text-center">Let's dive deeeeep</p>
                    </div>
                  )}
                  {!isLoading && searchResults.length === 0 && query && (
                    <div className="cursor-pointer py-2 px-3 hover:bg-slate-100">
                      <p className="text-sm font-medium text-gray-600">No results Found</p>
                      <p className="text-sm text-gray-500">Try searching something else 😅</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative ml-2" ref={dropdownRef}>
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className="text-white bg-primary-800 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={handleDropdownToggle}
            >
              {selectedOption}
              <svg
                className={`w-2.5 h-2.5 ml-2.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdownInformation"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                  <li>
                    <button
                      onClick={() => handleDropdownOptionClick('Title')}
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedOption === 'Title' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    >
                      Title
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleDropdownOptionClick('ISBN')}
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedOption === 'ISBN' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    >
                      ISBN
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleDropdownOptionClick('Author')}
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedOption === 'Author' ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                    >
                      Author
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative ml-2">
            <ThemeChanger></ThemeChanger>
          </div>
        </div>


      </div>

    </>
  );
}

export default SearchBar;