"use client"

import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import UpdatePassword from "@/app/settings/UpdatePassword";
import UpdateProfilePicture from "@/app/settings/UpdateProfilePicture";
import UpdateUserDetails from "@/app/settings/UpdateUserDetails";
import {useRouter} from 'next/navigation'
import Notification from "@/components/Notification";

export default function SettingPage() {

    const {data: session, status, update} = useSession();
    const [activeSection, setActiveSection] = useState('user_details');
    const router = useRouter()
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const initialSection = new URLSearchParams(window.location.search).get('section');
        if (initialSection) {
            setActiveSection(initialSection);
        }
    }, []);

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        router.push(`/settings?section=${sectionId}`, {scroll: false});
    };

    return (<div className="container mx-auto">
        {notification && <Notification message={notification.message} type={notification.type}
                                       duration={notification.duration}/>}
        <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-2">
            <div className=" mt-3 p-5">
                <ul className="space-y-2 font-medium">
                    <li>
                                <span
                                    onClick={() => handleSectionClick('user_details')}
                                    className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Update User Details</span>
                                </span>
                    </li>
                    <li>
                                <span
                                    onClick={() => handleSectionClick('update_password')}
                                    className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 22 21">
                                        <path
                                            d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                        <path
                                            d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                    </svg>
                                    <span className="ms-3">Update Password</span>
                                </span>
                    </li>
                    <li>
                                <span
                                    onClick={() => handleSectionClick('update_profile_pic')}
                                    className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 20 18">
                                        <path
                                            d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Update Profile Picture</span>
                                </span>
                    </li>
                </ul>

            </div>

            <div className="md:col-span-4 p-5 mt-3">
                <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {activeSection === 'update_password' && <UpdatePassword session={session} status={status}/>}
                    {activeSection === 'update_profile_pic' &&
                        <UpdateProfilePicture session={session} status={status} update={update} setNotification={setNotification}/>}
                    {activeSection !== 'update_password' && activeSection !== 'update_profile_pic' && (
                        <UpdateUserDetails session={session} status={status} update={update} setNotification={setNotification}/>)}
                </div>
            </div>
        </div>
    </div>);
}