"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from 'react';
import { fetchComment, fetchGetComment, fetchReply } from "@/utils";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";

const Comment = ({ bookId }) => {

    const { data: session } = useSession();
    const [loadedComments, setLoadedComments] = useState(5);
    const [commentsOffset, setCommentsOffset] = useState(0);
    const [loadMoreTrigger, setLoadMoreTrigger] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReply = (commentId) => {
        setReplyingTo(commentId);
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
                    return { ...comment, replies: updatedReplies };
                }
                return comment;
            });

            setComments(updatedComments);

        } else {
            console.error('Failed to submit Reply');
        }

    };

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

        } else {
            console.error('Failed to submit comment');
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const commentsData = await fetchGetComment(bookId, loadedComments, commentsOffset);
            if (commentsData?.data?.length > 0) {
                setComments((prevComments) => [...prevComments, ...commentsData.data]);
                setCommentsOffset(prevOffset => prevOffset + loadedComments);
            }
        };

        if (loadMoreTrigger) {
            fetchComments();
            setLoadMoreTrigger(false);
        }
    }, [bookId, loadedComments, commentsOffset, loadMoreTrigger]);

    const handleLoadMore = () => {
        setLoadMoreTrigger(true);
    };

    return (
        <>
            <div className='mb-2'>
                <div className="flex justify-start dark:bg-gray-600 bg-gray-100 rounded-full py-4">
                    <div className="flex w-full pl-5">
                        <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                            </svg>
                        </span>
                        <img className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />
                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="" />
                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80" alt="" />
                        <img className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80" alt="" />
                    </div>
                    <div className="flex justify-end w-full pr-5">
                        <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                        </span>
                        <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="mt-3 mx-5 flex flex-row text-xs">
                        <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center dark:text-white">Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
                        </div>
                        <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center dark:text-white">Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
                        </div>
                    </div>
                    <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                        <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center dark:text-white">Likes: <div className="ml-1 text-gray-400 text-ms"> 120k</div>
                        </div>
                    </div>
                </div>
            </div>

            {
                session ? (
                    <div className="bg-white shadow rounded-2xl mb-2 p-4">
                        <div className="flex flex-row px-2 py-3 mx-3">
                            <div className="w-auto h-auto rounded-full border-2 border-green-500">
                                <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200" />
                            </div>
                            <div className="flex flex-col mb-2 ml-4 mt-1">
                                <div className="text-gray-600 text-sm font-semibold">{session?.user?.name}</div>
                                <div clclassNameass="flex w-full mt-1">
                                    <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                                        UX Design
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                name="message"
                                placeholder="Type something..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                            ></textarea>
                            <footer className="flex justify-between mt-2">
                                <div className="flex gap-2"></div>
                                <button
                                    type="submit"
                                    className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
                                >
                                    Comment
                                    <svg
                                        className="ml-1"
                                        viewBox="0 0 24 24"
                                        width="16"
                                        height="16"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </footer>
                        </form>
                    </div>
                ) : (<>
                    <p>Login to Comment</p>
                </>)
            }


            <div className="bg-white border-b-2 border-r-2 border-gray-200 rounded-2xl sm:shadow-sm mx-auto sm:px-4 sm:py-4 md:px-4">
                {comments &&
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            class="flex-col w-full py-4 px-4">
                            <div class="flex flex-row">
                                <Image class="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar" width={100} height={100}
                                    src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />
                                <div class="flex-col mt-1">
                                    <div class="flex items-center flex-1 px-4 font-bold leading-tight">{comment?.user?.user_name}
                                        <span class="ml-2 text-xs font-normal text-gray-500"> {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                                    </div>
                                    <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                        {comment.content}
                                    </div>
                                    <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column" onClick={() => handleReply(comment.id)}>
                                        <svg class="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                                            viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                                fill-rule="nonzero" />
                                        </svg>
                                    </button>
                                    <button class="inline-flex items-center px-1 -ml-1 flex-column">
                                        <svg class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {replyingTo === comment.id && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Type your reply..."
                                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 mt-2"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white rounded-lg py-1 px-4 text-sm mt-2"
                                    >
                                        Reply
                                    </button>
                                </form>
                            )}

                            <hr class="my-2 ml-16 border-gray-200" />

                            {comment?.replies && comment.replies.map((reply) => (
                                <div class="flex flex-row pt-1 md-10 md:ml-16">
                                    <Image class="w-12 h-12 border-2 border-gray-300 rounded-full" alt="Emily's avatar" width={100} height={100}
                                        src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />
                                    <div class="flex-col mt-1">
                                        <div class="flex items-center flex-1 px-4 font-bold leading-tight">{reply?.user?.user_name}
                                            <span class="ml-2 text-xs font-normal text-gray-500">  {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
                                        </div>
                                        <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                            {reply.content}
                                        </div>
                                        <button class="inline-flex items-center px-1 -ml-1 flex-column">
                                            <svg class="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                <button
                    onClick={handleLoadMore}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Load More
                </button>
            </div>
        </>
    )
}

export default Comment;