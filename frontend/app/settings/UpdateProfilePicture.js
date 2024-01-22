"use client"

import React, {useState} from 'react';

const updateProfilePicture = ({session}) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const handleProfilePictureUpload = async () => {
        // Call backend API to upload profile picture using profilePicture state
    };

    return (
        <div className="rounded bg-gray-50 dark:bg-gray-800">
            <div className="p-8">
                <form onSubmit={handleProfilePictureUpload}>

                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Update
                        Profile Picture</h2>
                    <form onSubmit={handleProfilePictureUpload}>
                        <div className="mt-4">
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                accept="image/jpeg, image/png"
                                className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                            />
                            {profilePicture && (
                                <div className="mt-2">
                                    <img src={URL.createObjectURL(profilePicture)} alt="Preview"
                                         className="w-40 h-40 rounded-full"/>
                                </div>
                            )}
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium text-xs leading-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-400 dark:hover:bg-blue-600">
                                Update Profile Picture
                            </button>
                        </div>
                    </form>

                </form>
            </div>
        </div>
    )
}

export default updateProfilePicture;