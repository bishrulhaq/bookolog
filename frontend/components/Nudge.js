"use client"

import {useSession} from "next-auth/react"
import {useState, useEffect} from 'react';
import {fetchAddNudge, fetchGetNudge, fetchSetInteraction} from "@/utils";
import {formatDistanceToNow} from 'date-fns';
import Image from "next/image";
import Link from "next/link";

const Nudge = ({interactionId, interactionUserId, userInteraction}) => {

    const {data: session} = useSession();
    const [loadedComments, setLoadedComments] = useState(5);
    const [commentsOffset, setCommentsOffset] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [nudges, setNudges] = useState([]);
    const [liked, setLiked] = useState(userInteraction?.liked ?? null);
    const [totalComments, setTotalComments] = useState(0);
    const [interaction, setInteraction] = useState({completedCount: 0, likeCount: 0, readingCount: 0, toReadCount: 0});

    const API_URL = process.env.API_URL;

    const handleLike = async () => {

        const user_id = session.user.id
        const token = session.user.j_token
        const status = !liked
        const interactionType = 'liked'

        try {
            const response = await fetchSetInteraction(user_id, interactionId, interactionType, status, token)
            if (response.status === 200) {
                setLiked(status);

                setInteraction((prevInteraction) => ({
                    ...prevInteraction,
                    likeCount: status === false ? interaction?.likeCount - 1 : interaction?.likeCount + 1
                }));
            }
        } catch (error) {
            console.error('Error updating book interaction status:', error);
        }
    };

    const handleLoadMore = () => {
        const remainingComments = totalComments - loadedComments;
        const commentsToLoad = remainingComments >= 5 ? 5 : remainingComments;
        setLoadedComments(prevLoadedComments => prevLoadedComments + commentsToLoad);
    };

    const handleNudgeSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            return;
        }

        const response = await fetchAddNudge(interactionId, session.user.id, commentText, session.user.j_token)

        if (response.success === true) {
            setCommentText('');
            const newNudge = response?.data;
            setNudges((prevNudges) => [newNudge, ...prevNudges]);
            setTotalComments(totalComments + 1)
            setLoadedComments(loadedComments + 1)

        } else {
            console.error('Failed to submit Nudge');
        }
    };

    useEffect(() => {
        const fetchNudges = async () => {
            const nudgesData = await fetchGetNudge(interactionId, loadedComments, commentsOffset, session.user.j_token);
            if (nudgesData?.data?.nudges.length > 0) {
                setNudges(nudgesData.data?.nudges);
                setTotalComments(nudgesData.data?.total);  // New line to set total comments
            }
        };


        if (session) {
            fetchNudges();
        }

    }, [interactionId, loadedComments, commentsOffset, session?.user]);

    return (<>
        {session && interactionUserId !== session.user.id && (<div
            className="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
            <img className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                 alt="User avatar"
                 src={`${API_URL}/images/profile_picture/${session?.user?.profile_pic ?? 'default.jpg'}`}
            />
            <form onSubmit={handleNudgeSubmit} className="w-full">
                <input type="text"
                       onChange={(e) => setCommentText(e.target.value)}
                       className="dark:rounded-lg w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                       placeholder="Nudge..." autoComplete="off"/>
            </form>
        </div>)}


        <div>
            {nudges && nudges.map((nudges) => (<div
                className="mb-2 rounded-2xl sm:shadow-sm mx-auto px-4 py-2">
                <div
                    key={nudges.id}
                    className="flex-col w-full">
                    <div className="flex flex-row">
                        <Link href={`/user/${nudges?.user?.unique_id}`}>
                            <Image className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                                   alt="Noob master's avatar" width={100} height={100}
                                   src={`${API_URL}/images/profile_picture/${nudges?.user?.profile_pic ?? 'default.jpg'}`}/>
                        </Link>
                        <div className="flex-col mt-1">
                            <div
                                className="flex items-center flex-1 px-2 font-bold leading-tight dark:text-white">{nudges?.user?.user_name}
                                <span
                                    className="ml-2 text-xs font-normal text-gray-500 dark:text-white"> {formatDistanceToNow(new Date(nudges.createdAt), {addSuffix: true})}</span>
                            </div>
                            <div
                                className="flex-1 px-1 ml-2 my-1 text-sm font-medium leading-loose text-gray-600 dark:text-white">
                                {nudges.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>))}
        </div>

        <div
            className="flex align-middle text-gray-700 font-normal rounded-md mb-2 mr-4 items-center text-center dark:text-white ">
            {totalComments > 10 ? (<span className="text-gray-400"> Showing Comments of <span
                className="text-gold-600">{loadedComments} out of {totalComments}</span>{totalComments > loadedComments && (
                <span className="text-blue-500 cursor-pointer"
                      onClick={() => handleLoadMore()}> (Load More)</span>)}</span>) : null}
        </div>
    </>)
}

export default Nudge;