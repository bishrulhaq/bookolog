"use client"

import {useSession} from "next-auth/react"
import {useState, useEffect} from 'react';
import {
    fetchComment, fetchGetComment, fetchReply, fetchReplyById, fetchSetInteraction, fetchInteractionCount
} from "@/utils";
import {formatDistanceToNow} from 'date-fns';
import Image from "next/image";
import Link from "next/link";

const Comment = ({bookId, userInteraction}) => {

    const {data: session} = useSession();
    const [loadedComments, setLoadedComments] = useState(5);
    const [commentsOffset, setCommentsOffset] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [liked, setLiked] = useState(userInteraction?.liked ?? null);
    const [selectedButton, setSelectedButton] = useState(userInteraction?.read_status ?? null);
    const [totalComments, setTotalComments] = useState(0);
    const [interaction, setInteraction] = useState({completedCount: 0, likeCount: 0, readingCount: 0, toReadCount: 0});
    const [loadingReadingStatus, setLoadingReadingStatus] = useState(false);
    const API_URL = process.env.API_URL;

    const handleButtonClick = async (buttonType) => {
        try {
            setLoadingReadingStatus(true);
            const token = session.user.j_token
            const user_id = session.user.id
            const selectedType = selectedButton === buttonType ? null : buttonType

            const response = await fetchSetInteraction(user_id, bookId, 'read_status', selectedType, token)
            if (response.status === 200) {
                setSelectedButton(selectedType);
                await getInteractionCount();
                setLoadingReadingStatus(false);
            }
        } catch (error) {
            console.error('Error updating book interaction status:', error);
            setLoadingReadingStatus(true);
        }

    };

    const getInteractionCount = async () => {
        try {
            const response = await fetchInteractionCount(bookId)
            if (response.status === 200) {
                setInteraction(response?.data)
            }
        } catch (error) {
            console.error('Error updating book interaction status:', error);
        }
    };


    const handleReply = (commentId) => {
        replyingTo === commentId ? setReplyingTo(null) : setReplyingTo(commentId)
    };

    const handleLike = async () => {

        const user_id = session.user.id
        const token = session.user.j_token
        const status = !liked
        const interactionType = 'liked'

        try {
            const response = await fetchSetInteraction(user_id, bookId, interactionType, status, token)
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

    const handleReplySubmit = async (e, parentCommentId) => {
        e.preventDefault();

        if (!session) {
            return;
        }

        const response = await fetchReply(bookId, session.user.id, replyText, parentCommentId)

        if (response.success === true) {

            setReplyText('');
            setReplyingTo(null);

            const newReply = response?.data;
            const updatedComments = comments.map(comment => {
                if (comment.id === parentCommentId) {
                    const updatedReplies = Array.isArray(comment.replies) ? [newReply, ...comment.replies] : [newReply];
                    return {...comment, replies: updatedReplies};
                }
                return comment;
            });

            setComments(updatedComments);

        } else {
            console.error('Failed to submit Reply');
        }

    };

    const loadMoreReply = async (id) => {
        const response = await fetchReplyById(id);
        const newReply = response?.data;

        const updatedComments = comments.map(comment => {
            if (comment.id === id) {
                return {...comment, replies: newReply};
            }
            return comment;
        });

        setComments(updatedComments);
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!session) {
            return;
        }

        const response = await fetchComment(bookId, session.user.id, commentText)

        if (response.success === true) {
            setCommentText('');
            const newComment = response?.data;
            setComments((prevComments) => [newComment, ...prevComments]);
            setTotalComments(totalComments + 1)
            setLoadedComments(loadedComments + 1)

        } else {
            console.error('Failed to submit comment');
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await fetchGetComment(bookId, loadedComments, commentsOffset);
            if (commentsData?.data?.comments.length > 0) {
                setComments(commentsData.data?.comments);
                setTotalComments(commentsData.data.total);  // New line to set total comments
            }
        };

        fetchComments();
        getInteractionCount();

    }, [bookId, loadedComments, commentsOffset]);

    return (<>
        <div className='mb-2'>
            <div
                className={`flex justify-start dark:bg-gray-600 ${selectedButton === 'toRead' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-blue-200 shadow-xl' : selectedButton === 'completed' ? 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% shadow-green-100 shadow-xl' : selectedButton === 'reading' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-pink-100 shadow-xl' : 'bg-gray-400 shadow-gray-200 shadow-xl'} text-gray-900 bg-gray-100 rounded-full py-4`}>
                <div className="flex w-full pl-4">

                    <div className="inline-flex rounded-full shadow-sm" role="group">
                        <button
                            type="button"
                            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${selectedButton === 'toRead' && session ? 'text-white bg-cyan-950' : 'text-black bg-white'} rounded-s-3xl hover:bg-cyan-950 hover:text-white dark:text-black`}
                            onClick={() => loadingReadingStatus === false && session && handleButtonClick('toRead')}>Gonna
                            Read<span
                                className="bg-amber-800 transition ease-out duration-300 px-2 py-0.5 text-center rounded-full text-white cursor-pointer ml-2 ">{interaction?.toReadCount ?? 0}</span>
                        </button>
                        <button
                            type="button"
                            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${selectedButton === 'reading' && session ? 'text-white bg-fuchsia-800' : 'text-black bg-white'} hover:bg-fuchsia-800 hover:text-white dark:text-black`}
                            onClick={() => loadingReadingStatus === false && session && handleButtonClick('reading')}>Reading<span
                            className="bg-amber-800 transition ease-out duration-300 px-2 py-0.5 text-center rounded-full text-white cursor-pointer ml-2 ">{interaction?.readingCount ?? 0}</span>
                        </button>
                        <button
                            type="button"
                            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${selectedButton === 'completed' && session ? 'text-white bg-green-500' : 'text-black bg-white'} rounded-e-3xl hover:bg-green-500 hover:text-white dark:text-black`}
                            onClick={() => loadingReadingStatus === false && session && handleButtonClick('completed')}>Marked
                            as Complete<span
                                className="bg-amber-800 transition ease-out duration-300 px-2 py-0.5 text-center rounded-full text-white cursor-pointer ml-2 ">{interaction?.completedCount ?? 0}</span>
                        </button>
                    </div>

                </div>
                <div className="flex justify-end w-full pr-5">
                        <span
                            className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                        </span>
                    <span
                        onClick={() => session && handleLike()}
                        className={`transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full cursor-pointer ${liked ? 'text-red-500 shadow-pink-800 shadow-xl' : 'text-gray-700'}`}>
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="h-4 w-4">
                        <path
                            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                    </svg>

                        </span>
                </div>
            </div>

            <div className="flex w-full">
                <div className="mt-3 mx-5 flex flex-row text-xs">
                    <div
                        className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center dark:text-white">Comments:
                        <div className="ml-1 text-gray-400 text-ms"> {totalComments ?? 0}</div>
                    </div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                    <div
                        className="flex text-gray-700  rounded-md mb-2 mr-4 items-center dark:text-white">Likes: <div
                        className="ml-1 text-gray-400 text-ms"> {interaction?.likeCount ?? 0}</div>
                    </div>
                </div>
            </div>
        </div>

        {session ? (<div
            className="border-2 border-gray-200 border-dashed dark:border-gray-700 mb-5 rounded-2xl sm:shadow-sm mx-auto sm:px-4 sm:py-4 md:px-4 dark:bg-cyan-950">
            <div className="flex items-center mx-3">
                <div className="w-auto h-auto rounded-full border-2 border-green-500">
                    <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                         alt="User avatar"
                         src={`${API_URL}/images/profile_picture/${session?.user?.profile_pic ?? 'default.jpg'}`}
                         />
                </div>
                <div className="flex flex-col ml-4">
                    <div className="text-gray-600 text-sm font-semibold dark:text-white">{session?.user?.name}</div>
                    <div className="text-black font-base text-xs mr-1 cursor-pointer dark:text-white">
                        {session?.user?.email}
                    </div>
                </div>
                <form onSubmit={handleCommentSubmit} className="flex-grow">
                    <label htmlFor="chat" className="sr-only">Your message</label>
                    <div className="flex items-center">
                            <textarea id="chat" rows="1" value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      style={{minHeight: "43px"}}
                                      placeholder="Add Comment..."></textarea>
                        <button type="submit"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path
                                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                            </svg>
                            <span className="sr-only">Comment</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>) : (<>
            <div className="border-2 border-gray-200 border-dashed rounded-xl dark:border-gray-700 mb-5">
                <div className="text-center p-8">
                    <p className="dark:text-white"><Link href="/login" className="text-cyan-600">Sign In</Link> to
                        Comment</p>
                </div>

            </div>
        </>)}


        <>
            {comments && comments.map((comment) => (<div
                className="border-2 border-gray-200 border-dashed dark:border-gray-700 mb-5 rounded-2xl sm:shadow-sm mx-auto sm:px-4 sm:py-4 md:px-4">
                <div
                    key={comment.id}
                    className="flex-col w-full py-4 px-4">
                    <div className="flex flex-row">
                        <Link href={`/user/${comment?.user?.unique_id}`}>
                            <Image className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                                   alt="Noob master's avatar" width={100} height={100}
                                   src={`${API_URL}/images/profile_picture/${comment?.user?.profile_pic ?? 'default.jpg'}`}/>
                        </Link>
                        <div className="flex-col mt-1">
                            <div
                                className="flex items-center flex-1 px-4 font-bold leading-tight dark:text-white">{comment?.user?.user_name}
                                <span
                                    className="ml-2 text-xs font-normal text-gray-500 dark:text-white"> {formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}</span>
                            </div>
                            <div
                                className="flex-1 px-2 ml-2 my-2 text-sm font-medium leading-loose text-gray-600 dark:text-white">
                                {comment.content}
                            </div>
                            {session && (<button
                                className="inline-flex items-center px-1 py-2 mx-1 flex-column bg-amber-200 rounded-lg"
                                onClick={() => handleReply(comment.id)}>
                                <svg
                                    className="w-4 h-4 ml-2 text-xs text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                                    viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                        fill-rule="nonzero"/>
                                </svg>
                                <span className="text-xs px-2">Reply</span>
                            </button>)}


                            {/*<button className="inline-flex items-center px-1 -ml-1 flex-column">*/}
                            {/*    <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"*/}
                            {/*         fill="none"*/}
                            {/*         stroke="currentColor" viewBox="0 0 24 24"*/}
                            {/*         xmlns="http://www.w3.org/2000/svg">*/}
                            {/*        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                            {/*              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">*/}
                            {/*        </path>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>
                    </div>

                    {replyingTo === comment.id && (

                        <div
                            className="mt-1 md-10 md:ml-16 mb-1 mx-auto sm:px-4 sm:py-4 md:px-4">
                            <div className="flex items-center mx-3">
                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex-grow">
                                    <label htmlFor="chat" className="sr-only">Your message</label>
                                    <div className="flex items-center">
                                        <textarea id="chat" rows="1"
                                                  value={replyText}
                                                  style={{minHeight: "43px"}}
                                                  onChange={(e) => setReplyText(e.target.value)}
                                                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                  placeholder="Add Reply..."></textarea>
                                        <button type="submit"
                                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 18 20">
                                                <path
                                                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                                            </svg>
                                            <span className="sr-only dark:text-white">Reply</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>)}
                    <hr className="md-10 md:ml-16 border-b border-dashed border-gray-600 my-4"/>

                    {comment?.replies && comment?.replies.map((reply) => (
                        <div className="flex flex-row pt-1 md-10 md:ml-16 py-3">
                            <Image className="w-12 h-12 border-2 border-gray-300 rounded-full"
                                   alt={reply?.user?.user_name}
                                   width={100} height={100}
                                   src={`${API_URL}/images/profile_picture/${comment?.user?.profile_pic ?? 'default.jpg'}`}/>
                            <div className="flex-col mt-1">
                                <div
                                    className="flex items-center flex-1 px-4 font-bold leading-tight dark:text-white">{reply?.user?.user_name}
                                    <span
                                        className="ml-2 text-xs font-normal text-gray-500">  {formatDistanceToNow(new Date(reply?.createdAt), {addSuffix: true})}</span>
                                </div>
                                <div
                                    className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 dark:text-white">
                                    {reply.content}
                                </div>
                            </div>
                        </div>))}

                    {comment?.reply_count > 0 && (comment?.replies ? comment?.replies.length < comment?.reply_count : true) && (
                        <div className="flex flex-row pt-1 md-10 md:ml-16 py-3">
                        <span className="text-gold-600 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6"><path fill-rule="evenodd"
                                                           d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 4.5A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm15-.75A.75.75 0 0 1 18 9v10.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V9a.75.75 0 0 1 .75-.75Zm-15 5.25a.75.75 0 0 1 .75-.75h9.75a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                                                           clip-rule="evenodd"/>
                            </svg>
                        </span>
                            <span className="dark:text-white cursor-pointer hover:text-gold-600"
                                  onClick={() => loadMoreReply(comment?.id)}> Show {comment?.reply_count} Replies</span>
                        </div>)}
                </div>
            </div>))}

            <div
                className="flex align-middle text-gray-700 font-normal rounded-md mb-2 mr-4 items-center text-center dark:text-white ">
                {totalComments > 10 ? (<span className="text-gray-400"> Showing Comments of <span
                    className="text-gold-600">{loadedComments} out of {totalComments}</span>
                    {totalComments > loadedComments && (<span className="text-blue-500 cursor-pointer"
                                                              onClick={() => handleLoadMore()}> (Load More)</span>)}
                    </span>) : null}
            </div>


        </>

    </>)
}

export default Comment;