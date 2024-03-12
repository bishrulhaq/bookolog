"use client"
import React, {Suspense, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {fetchTimeline} from "@/utils";
import {formatDistanceToNow} from "date-fns";
import Comment from "@/components/Comment";
import Nudge from "@/components/Nudge";

export default function Timeline({user}) {

    const [timeline, setTimeline] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getTimeline = async () => {
            try {
                const response = await fetchTimeline(user?.country_code, user?.j_token);
                setIsLoading(false);
                setTimeline(response?.data)

            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching books:", error);
            }
        };

        if (user) {
            getTimeline();
        }


    }, [user]);


    return (<>

        <div
            className="font-semibold mb-2 mx-3 px-2 py-2 text-center bg-white rounded-lg dark:text-white dark:bg-blue-950">
            Latest Deals
        </div>

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
        </div>) : (timeline.map((interaction) => (<>{interaction.type === 'exchange' && (
            <div key={interaction.id} className="bg-white shadow rounded-lg mt-5 dark:bg-gray-900">
                <div className="flex flex-row px-2 py-3 mx-3">
                    <div className="w-auto h-auto rounded-full border-2 border-green-500 dark:border-amber-400">
                        <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                             alt="User avatar"
                             src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"/>

                    </div>
                    <div className="flex flex-col mb-2 ml-4 mt-1">
                        <div
                            className="text-gray-600 text-sm font-semibold dark:text-white">{interaction.user.first_name + " " + interaction.user.last_name}</div>
                        <div className="flex w-full mt-1">
                            <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer ">
                            </div>
                            <div className="text-gray-400 font-thin text-xs dark:text-gray-200">
                                {formatDistanceToNow(new Date(interaction.createdAt), {addSuffix: true})}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-100 dark:border-none"></div>
                <div className="font-semibold mb-2 mt-2 mx-3 px-2 dark:text-white">
                    Exchange <Link href="" className="text-amber-800">{interaction.book.title}</Link> for
                    <span>
                            {interaction.search_books.length > 0 && interaction.search_books.map((books, index) => (
                                <span>
                                    <Link href=""
                                          className="text-amber-800">{index > 0 && " , "} {books.title}</Link>
                                    <span>{index + 1 === interaction.search_books.length && " books"}</span>
                                </span>))}
                        </span>

                    <span>
                            {interaction.search_genres.length > 0 && interaction.search_genres.map((genres, index) => (
                                <span>
                                    <Link href=""
                                          className="text-amber-800">{index > 0 && " , "} {genres.category_title}</Link>
                                    <span>{index + 1 === interaction.search_genres.length && " categories"}</span>
                                </span>))}
                        </span>
                </div>

                <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{interaction.description}</div>

                <div className="flex w-full border-t border-gray-100 dark:border-none">
                    <div className="mt-3 mx-5 flex flex-row text-xs">
                        <div
                            className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Nudge:
                            <div className="ml-1 text-gray-400 text-ms"> 30</div>
                        </div>
                    </div>
                    <div className="mt-3 mx-5 w-full flex justify-end text-xs">


                    </div>
                </div>
                <Nudge interactionId={interaction?.id ?? null} interactionUserId={interaction?.user?.id ?? null} userInteraction={null}/>
            </div>)}

            {(interaction.type === 'sell' && (<div className="bg-white shadow rounded-lg mt-5 dark:bg-gray-900">
                <div className="flex flex-row px-2 py-3 mx-3">
                    <div className="w-auto h-auto rounded-full border-2 border-green-500 dark:border-amber-400">
                        <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                             alt="User avatar"
                             src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"/>

                    </div>
                    <div className="flex flex-col mb-2 ml-4 mt-1">
                        <div
                            className="text-gray-600 text-sm font-semibold dark:text-white">{interaction.user.first_name + " " + interaction.user.last_name}</div>
                        <div className="flex w-full mt-1">
                            <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer ">
                                Sri Lanka, Badulla
                            </div>
                            <div className="text-gray-400 font-thin text-xs dark:text-gray-200">
                                {formatDistanceToNow(new Date(interaction.createdAt), {addSuffix: true})}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-100 dark:border-none"></div>
                <div className="font-semibold mb-2 mt-2 mx-3 px-2 dark:text-white">
                    Selling <Link href="" className="text-amber-800">{interaction.book.title}</Link>
                </div>
                <div className="bg-amber-200 rounded-lg px-2 py-2 m-5">
                <span className="text-sm mb-2 px-2">Condition <Link href=""
                                                                    className="text-cyan-600">{interaction.condition}</Link></span>
                    <span className="text-sm mb-2 px-2">Selling for <Link href=""
                                                                          className="text-cyan-600">{interaction.price}</Link></span>
                    {interaction.negotiable && <span className="text-sm mb-2 px-2">Negotiable</span>}
                </div>
                <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{interaction.description}
                </div>
                <div className="flex w-full border-t border-gray-100 dark:border-none">
                    <div className="mt-3 mx-5 flex flex-row text-xs">
                        <div
                            className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Nudge:
                            <div className="ml-1 text-gray-400 text-ms"> 30</div>
                        </div>
                    </div>
                    <div className="mt-3 mx-5 w-full flex justify-end text-xs">

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
            </div>))}
        </>)))}
    < />)
}