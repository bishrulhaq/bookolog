"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useSession, signOut} from "next-auth/react"

const NavBar = () => {

    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const {data: session} = useSession();
    const API_URL = process.env.API_URL;


    const toggleMenu = (menu) => {
        if (menu === 'mainMenu') {
            setMainMenuOpen(!mainMenuOpen);
        } else if (menu === 'userMenu') {
            setUserMenuOpen(!userMenuOpen);
        }
    };


    return (<div>
        <nav className="bg-primary-800 ">
            <div className="container px-6 mx-auto lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center flex-grow">
                        <div className="flex-shrink-0">
                            <h1 className="text-lg font-semibold px-3 tracking-widest text-white uppercase">
                                <Link href="/">
                                    <Image src='/logo.png' alt="Bookolog" width="120" height="120"/>
                                </Link>
                            </h1>
                        </div>

                    </div>
                    <div className="hidden lg:block">
                        <div className="flex items-center">
                            <div className="flex flex-row items-center">
                                <Link
                                    href="/"
                                    className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-emerald-500 hover:shadow-green-700 hover:shadow-md focus:outline-none focus:text-white focus:bg-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/>
                                        <path
                                            d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"/>
                                    </svg>
                                    <span className="ml-2">Home</span>
                                </Link>

                            </div>
                            <div className="relative" onClick={() => toggleMenu('mainMenu')}>
                                <button
                                    className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-emerald-500 hover:shadow-green-700 hover:shadow-md focus:outline-none focus:text-white focus:bg-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z"/>
                                        <path fill-rule="evenodd"
                                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <span className="mx-2">Explore</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-4 h-4 mt-1 feather feather-chevron-down transform ${mainMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <Link href="/books"
                                      className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-emerald-500 hover:shadow-green-700 hover:shadow-md focus:outline-none focus:text-white focus:bg-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"/>
                                    </svg>
                                    <span className="ml-2">Books</span>
                                </Link>
                            </div>

                            <div>
                                <Link href="/genres"
                                      className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-emerald-500 hover:shadow-green-700 hover:shadow-md focus:outline-none focus:text-white focus:bg-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path fill-rule="evenodd"
                                              d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <span className="ml-2">Genres</span>
                                </Link>
                            </div>

                            <div>
                                <Link href="/about"
                                      className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-emerald-500 hover:shadow-green-700 hover:shadow-md focus:outline-none focus:text-white focus:bg-emerald-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z"/>
                                    </svg>
                                    <span className="ml-2">About Us</span>
                                </Link>
                            </div>

                            <div>
                                {session ? (<div className="z-50 relative inline-block text-left dropdown">
                        <span className="rounded-md shadow-sm">
                          <button
                              className="flex flex-row items-center px-2 py-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:text-gray-200"
                              type="button" aria-haspopup="true" aria-expanded="true"
                              aria-controls="headlessui-menu-items-117">
                            <Image
                                src={`${API_URL}/images/profile_picture/${session?.user?.profile_pic ?? 'default.jpg'}`}
                                width={30}
                                height={30}
                                alt="profile Image"
                                className='rounded-full mr-2'
                            />
                            <span>{session?.user?.name}</span>
                            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path></svg>
                          </button>
                        </span>
                                    <div
                                        className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                                        <div
                                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-800 b-shadow divide-y divide-gray-100 rounded-lg shadow-lg outline-none"
                                            aria-labelledby="headlessui-menu-button-1"
                                            id="headlessui-menu-items-117" role="menu">
                                            <div className="px-4 py-3">
                                                <p className="text-sm leading-5- dark:text-white">Signed in
                                                    as</p>
                                                <p className="text-sm font-medium leading-5 text-gray-900 truncate dark:text-white">{session?.user?.email}</p>
                                            </div>
                                            <div className="px-4 py-3">
                                                <Link href="/lounge" tabindex="1"
                                                      className="dark:text-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                                      role="menuitem">Lounge</Link>
                                            </div>
                                            <div className="py-1">
                                                <Link href="/settings" tabindex="0"
                                                      className="dark:text-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                                      role="menuitem">Account settings</Link>
                                            </div>
                                            <div className="py-1">
                                                <p onClick={() => signOut()} tabindex="3"
                                                   className="cursor-pointer dark:text-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                                   role="menuitem">Sign out</p></div>
                                        </div>
                                    </div>
                                </div>) : (<Link
                                    href="/login"
                                    className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                                >
                                    <svg className="w-4 h-4 feather feather-file" viewBox="0 0 24.00 24.00"
                                         fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                                stroke="#ffffff" strokeWidth="1.608" strokeLinecap="round"
                                                strokeLinejoin="round"></path>
                                        </g>
                                    </svg>
                                    <span className="ml-2">Log In</span>
                                </Link>)}

                            </div>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex-mr-2 lg:hidden">
                        <button
                            onClick={() => toggleMenu('mainMenu')}
                            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                            aria-label={mainMenuOpen ? 'Close main menu' : 'Main menu'}
                            aria-expanded={mainMenuOpen}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-6 h-6 feather feather-menu ${mainMenuOpen ? 'hidden' : 'inline-flex'}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-6 h-6 feather feather-x ${mainMenuOpen ? 'inline-flex' : 'hidden'}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {mainMenuOpen && (<div className="container px-6 mx-auto lg:px-8">
                <div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5 px-5 align-middle">
                    <span
                        className="flex hover:animate-pulse cursor-pointer bg-blue-100 hover:bg-blue-950 hover:text-white hover:drop-shadow-lg px-5 py-2.5 text-blue-800 text-sm font-medium me-2 rounded-lg dark:bg-blue-900 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-6 h-6">
                            <path fill-rule="evenodd"
                                  d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <span className="pl-5">Trending Books</span>
                    </span>
                    <span
                        className="flex hover:animate-pulse cursor-pointer bg-gray-100 hover:bg-gray-900 hover:text-white hover:drop-shadow-lg px-5 py-2.5 text-gray-800 text-sm font-medium me-2 rounded-lg dark:bg-gray-700 dark:text-gray-300align-middle ">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                              className="w-6 h-6"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                             <path fill-rule="evenodd"
                                   d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                   clip-rule="evenodd"/>
                         </svg>
                        <span className="pl-5">Most Viewed Books</span>
                    </span>
                    <span
                        className="flex hover:animate-pulse cursor-pointer bg-red-100 hover:bg-red-950 hover:text-white hover:drop-shadow-lg px-5 py-2.5 text-red-800 text-sm font-medium me-2 rounded-lg dark:bg-red-900 dark:text-red-300 align-middle">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                               className="w-6 h-6">
                              <path
                                  d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                          </svg>
                        <span className="pl-5">Most Liked Books</span>
                    </span>
                    <span
                        className="flex hover:animate-pulse cursor-pointer bg-green-100 hover:bg-teal-950 hover:text-white px-5 py-2.5 text-green-800 text-sm font-medium me-2 rounded-lg dark:bg-green-900 dark:text-green-300 align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fill-rule="evenodd"
                                  d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <span className="pl-5">Most Read Books</span>
                    </span>
                </div>
            </div>)}
        </nav>


        {/* Mobile menu */}
        <div className={`lg:hidden ${mainMenuOpen ? 'block' : 'hidden'}`}>
            <div className="mx-auto">
                <div className="bg-white shadow-lg">
                    <div className="divide-y-2 divide-gray-100">
                        <div className="py-2 space-y-1">
                            <Link
                                href="/"
                                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Home
                            </Link>
                            <Link
                                href="/books"
                                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                Books
                            </Link>
                        </div>
                        <div className="py-2 space-y-1">
                            <div className='px-2 py-2'>
                                {session ? (<div className='bg-gray-200 rounded-lg'>
                        <span className="block px-4 py-2 text-sm font-medium text-gray-700">
                          <div
                              className="flex flex-row items-center px-2 py-2 text-sm font-medium leading-5 text-gray-800">
                             <Image
                                 src={`${API_URL}/images/profile_picture/${session?.user?.profile_pic ?? 'default.jpg'}`}
                                 width={30}
                                 height={30}
                                 alt="profile Image"
                                 className='rounded-full mr-2'/>
                            <span>{session?.user?.name}</span>
                          </div>
                        </span>
                                        <div className="block font-medium text-gray-700">
                                            <div className="px-4 py-3">
                                                <p className="text-sm leading-5 text-gray-800">Signed in
                                                    as <span className='font-bold'>{session?.user?.email}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            onClick={() => signOut()}
                                            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                            Sign Out
                                        </p>
                                    </div>

                                ) : (<Link href="/login"
                                           className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                    Log In
                                </Link>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default NavBar;