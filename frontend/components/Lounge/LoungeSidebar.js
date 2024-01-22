const LoungeSidebar = ({user}) => {

    return (<>
        <div className="bg-white shadow-lg rounded-lg p-10 dark:bg-gray-900">
            <div className="flex flex-col gap-1 text-center items-center">
                <img className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                     src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png" alt=""/>
                <p className="font-semibold dark:text-white">Bishrul Haq</p>
                <div
                    className="text-sm leading-normal text-gray-400 dark:text-white flex justify-center items-center">
                    <svg viewBox="0 0 24 24" className="mr-1" width="16" height="16" stroke="currentColor"
                         strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Uva, Sri Lanka
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 my-3">
                <div className="font-semibold text-center mx-4">
                    <p className="text-black dark:text-white">102</p>
                    <span className="text-gray-400">Posts</span>
                </div>
                <div className="font-semibold text-center mx-4">
                    <p className="text-black dark:text-white">102</p>
                    <span className="text-gray-400">Nudge</span>
                </div>
                <div className="font-semibold text-center mx-4">
                    <p className="text-black dark:text-white">102</p>
                    <span className="text-gray-400">Folowing</span>
                </div>
            </div>
        </div>

        <div className="bg-white shadow mt-6 rounded-lg p-6 dark:bg-gray-900">
            <h3 className="text-gray-600 text-sm font-semibold mb-4 dark:text-white">Currently Reading</h3>
            <ul>
                <li className="flex bg-white shadow mt-6 dark:bg-gray-800 rounded-lg p-2">
                    <img
                        src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                        alt="Just a flower" className=" w-16  object-cover  h-16 rounded-xl"/>
                    <div className="flex flex-col justify-center w-full  px-2 py-1">
                        <div className="flex justify-between items-center pl-2">
                            <div className="flex flex-col">
                                <h2 className="text-sm font-medium">Rich Dad Poor Dad</h2>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </div>
                        <div className="flex pt-2  text-sm text-gray-400 pl-2">
                            <div className="flex items-center mr-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <p className="font-normal">4.5</p>
                            </div>
                            {/*<div className="flex items-center font-medium text-gray-900 ">*/}
                            {/*    $1800*/}
                            {/*    <span className="text-gray-400 text-sm font-normal"> /wk</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </li>
                <li className="flex bg-white shadow mt-6 dark:bg-gray-800 rounded-lg p-2">
                    <img
                        src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                        alt="Just a flower" className=" w-16  object-cover  h-16 rounded-xl"/>
                    <div className="flex flex-col justify-center w-full  px-2 py-1">
                        <div className="flex justify-between items-center pl-2">
                            <div className="flex flex-col">
                                <h2 className="text-sm font-medium">Daily Stoics</h2>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </div>
                        <div className="flex pt-2  text-sm text-gray-400 pl-2">
                            <div className="flex items-center mr-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <p className="font-normal">4.5</p>
                            </div>
                            {/*<div className="flex items-center font-medium text-gray-900 ">*/}
                            {/*    $1800*/}
                            {/*    <span className="text-gray-400 text-sm font-normal"> /wk</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-white shadow mt-6 rounded-lg p-6 dark:bg-gray-900">
            <h3 className="text-gray-600 text-sm font-semibold mb-4 dark:text-white">Book Shelf</h3>
            <ul>
                <li className="flex bg-white shadow mt-6 dark:bg-gray-800 rounded-lg p-2">
                    <img
                        src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                        alt="Just a flower" className=" w-16  object-cover  h-16 rounded-xl"/>
                    <div className="flex flex-col justify-center w-full  px-2 py-1">
                        <div className="flex justify-between items-center pl-2">
                            <div className="flex flex-col">
                                <h2 className="text-sm font-medium">Rich Dad Poor Dad</h2>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </div>
                        <div className="flex pt-2  text-sm text-gray-400 pl-2">
                            <div className="flex items-center mr-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <p className="font-normal">4.5</p>
                            </div>
                            {/*<div className="flex items-center font-medium text-gray-900 ">*/}
                            {/*    $1800*/}
                            {/*    <span className="text-gray-400 text-sm font-normal"> /wk</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </li>
                <li className="flex bg-white shadow mt-6 dark:bg-gray-800 rounded-lg p-2">
                    <img
                        src="https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1189&amp;q=80"
                        alt="Just a flower" className=" w-16  object-cover  h-16 rounded-xl"/>
                    <div className="flex flex-col justify-center w-full  px-2 py-1">
                        <div className="flex justify-between items-center pl-2">
                            <div className="flex flex-col">
                                <h2 className="text-sm font-medium">Daily Stoics</h2>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 text-gray-500 hover:text-blue-400 cursor-pointer" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </div>
                        <div className="flex pt-2  text-sm text-gray-400 pl-2">
                            <div className="flex items-center mr-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                <p className="font-normal">4.5</p>
                            </div>
                            {/*<div className="flex items-center font-medium text-gray-900 ">*/}
                            {/*    $1800*/}
                            {/*    <span className="text-gray-400 text-sm font-normal"> /wk</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        {/*<div className="flex mt-5 overflow-x-scroll w-full px-2 py-2 ">*/}
        {/*    <div*/}
        {/*        className="flex flex-row items-end h-72 w-48 bg-gradient-to-t from-green-400 to-gold-300 rounded-lg py-2 px-2">*/}
        {/*        <div className="absolute right-0 top-0 m-2">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg"*/}
        {/*                 className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200"*/}
        {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>*/}
        {/*            </svg>*/}
        {/*        </div>*/}
        {/*        <div className="p-6 rounded-lg flex flex-col w-full z-10">*/}
        {/*            <h4 className="mt-1 text-white text-xl font-semibold leading-tight truncate">Loremipsum..</h4>*/}
        {/*            <div className="flex justify-between items-center">*/}
        {/*                <div className="flex flex-col">*/}
        {/*                    <h2 className="text-sm flex items-center text-gray-300 font-normal">*/}
        {/*                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"*/}
        {/*                             viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
        {/*                        </svg>*/}
        {/*                        Dubai*/}
        {/*                    </h2>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*            <div className="flex pt-4 text-sm text-gray-300">*/}
        {/*                <div className="flex items-center mr-auto">*/}
        {/*                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"*/}
        {/*                         viewBox="0 0 20 20" fill="currentColor">*/}
        {/*                        <path*/}
        {/*                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>*/}
        {/*                    </svg>*/}
        {/*                    <p className="font-normal">4.5</p>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div*/}
        {/*        className="flex flex-row ml-5 items-end w-48 bg-gradient-to-t from-green-400 to-red-300 rounded-lg py-2 px-2">*/}
        {/*        <div className="absolute right-0 top-0 m-2">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg"*/}
        {/*                 className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200"*/}
        {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>*/}
        {/*            </svg>*/}
        {/*        </div>*/}
        {/*        <div className="p-6 rounded-lg flex flex-col w-full z-10">*/}
        {/*            <h4 className="mt-1 text-white text-xl font-semibold leading-tight truncate">Loremipsum..</h4>*/}
        {/*            <div className="flex justify-between items-center">*/}
        {/*                <div className="flex flex-col">*/}
        {/*                    <h2 className="text-sm flex items-center text-gray-300 font-normal">*/}
        {/*                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"*/}
        {/*                             viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
        {/*                        </svg>*/}
        {/*                        Dubai*/}
        {/*                    </h2>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*            <div className="flex pt-4 text-sm text-gray-300">*/}
        {/*                <div className="flex items-center mr-auto">*/}
        {/*                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"*/}
        {/*                         viewBox="0 0 20 20" fill="currentColor">*/}
        {/*                        <path*/}
        {/*                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>*/}
        {/*                    </svg>*/}
        {/*                    <p className="font-normal">4.5</p>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div*/}
        {/*        className="flex flex-row ml-5 items-end w-48 bg-gradient-to-t from-green-400 to-green-300 rounded-lg py-2 px-2">*/}
        {/*        <div className="absolute right-0 top-0 m-2">*/}
        {/*            <svg xmlns="http://www.w3.org/2000/svg"*/}
        {/*                 className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200"*/}
        {/*                 fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>*/}
        {/*            </svg>*/}
        {/*        </div>*/}
        {/*        <div className="p-6 rounded-lg flex flex-col w-full z-10">*/}
        {/*            <h4 className="mt-1 text-white text-xl font-semibold leading-tight truncate">Loremipsum..</h4>*/}
        {/*            <div className="flex justify-between items-center">*/}
        {/*                <div className="flex flex-col">*/}
        {/*                    <h2 className="text-sm flex items-center text-gray-300 font-normal">*/}
        {/*                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none"*/}
        {/*                             viewBox="0 0 24 24" stroke="currentColor">*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>*/}
        {/*                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
        {/*                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
        {/*                        </svg>*/}
        {/*                        Dubai*/}
        {/*                    </h2>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*            <div className="flex pt-4 text-sm text-gray-300">*/}
        {/*                <div className="flex items-center mr-auto">*/}
        {/*                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1"*/}
        {/*                         viewBox="0 0 20 20" fill="currentColor">*/}
        {/*                        <path*/}
        {/*                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>*/}
        {/*                    </svg>*/}
        {/*                    <p className="font-normal">4.5</p>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}


    </>)
};

export default LoungeSidebar;