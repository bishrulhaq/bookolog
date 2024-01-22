"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useSession, signOut} from "next-auth/react"

const NavBar = () => {

    const [mainMenuOpen, setMainMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const {data: session} = useSession();


    const toggleMenu = (menu) => {
        if (menu === 'mainMenu') {
            setMainMenuOpen(!mainMenuOpen);
        } else if (menu === 'userMenu') {
            setUserMenuOpen(!userMenuOpen);
        }
    };


    return (
        <div>
            <nav className="bg-primary-800">
                <div className="container px-6 mx-auto lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center flex-grow">
                            <div className="flex-shrink-0">
                                <h1 className="text-lg font-semibold px-3 tracking-widest text-white uppercase">
                                    <Link href="/">Bookolog</Link>
                                </h1>
                            </div>

                        </div>
                        <div className="hidden lg:block">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center">
                                    <Link
                                        href="/"
                                        className="flex flex-row items-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 feather feather-home"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        <span className="ml-2">Home</span>
                                    </Link>

                                </div>
                                <div className="relative" onClick={() => toggleMenu('mainMenu')}>
                                    <button
                                        className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 feather feather-folder"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path
                                                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        <span className="mx-2">Pages</span>
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
                                    {mainMenuOpen && (
                                        <div
                                            className="z-10 absolute right-0 mt-2 space-y-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                Home
                                            </Link>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                About
                                            </Link>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                Services
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Link
                                        href="/books"
                                        className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 feather feather-file"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                            <polyline points="13 2 13 9 20 9"></polyline>
                                        </svg>
                                        <span className="ml-2">Books</span>
                                    </Link>
                                </div>

                                <div>
                                    <Link
                                        href="/genres"
                                        className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 feather feather-file"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                            <polyline points="13 2 13 9 20 9"></polyline>
                                        </svg>
                                        <span className="ml-2">Genres</span>
                                    </Link>
                                </div>

                                <div>
                                    <Link
                                        href="/about"
                                        className="flex flex-row items-center px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 feather feather-file"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                            <polyline points="13 2 13 9 20 9"></polyline>
                                        </svg>
                                        <span className="ml-2">About Us</span>
                                    </Link>
                                </div>

                                <div>
                                    {
                                        session ? (
                                            <div className="z-50 relative inline-block text-left dropdown">
                        <span className="rounded-md shadow-sm">
                          <button
                              className="flex flex-row items-center px-2 py-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:text-gray-200"
                              type="button" aria-haspopup="true" aria-expanded="true"
                              aria-controls="headlessui-menu-items-117">
                            <Image
                                src={session?.user?.picture || '/profile.jpg'}
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
                                            </div>
                                        ) : (
                                            <Link
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
                                            </Link>
                                        )
                                    }

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
            </nav>


            {/* Mobile menu */}
            < div className={`lg:hidden ${mainMenuOpen ? 'block' : 'hidden'}`}>
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
                                    {
                                        session ? (
                                            <div className='bg-gray-200 rounded-lg'>
                        <span className="block px-4 py-2 text-sm font-medium text-gray-700">
                          <div
                              className="flex flex-row items-center px-2 py-2 text-sm font-medium leading-5 text-gray-800">
                            <Image
                                src={session?.user?.picture || '/profile.jpg'}
                                width={30}
                                height={30}
                                alt="profile Image"
                                className='rounded-full mr-2'
                            />
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

                                        ) : (
                                            <Link href="/login"
                                                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                Log In
                                            </Link>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;