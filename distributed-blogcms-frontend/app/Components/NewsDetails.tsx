'use client'

import React, { useEffect, useState } from 'react'
import CommentCard from './CommentItem'
import axios from 'axios';
import { useParams } from 'next/navigation';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

interface NewsDetailsProps {
    content: string;
    image?: string;
}

const NewsDetails = () => {
    const axiosInstance = useAxiosPrivate()
    const [newsDetails, setNewsDetails] = useState<NewsDetailsProps | any>({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const slug = useParams().slug

    const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/slug/${slug}`

    const fetchNewsDetails = async () => {
        try {
            const response = await axios.get(apiEndpoint);
            setNewsDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching news details:', error);
        }
    };

    const fetchComments = async () => {
        try {
            if(newsDetails._id){
                const commentApiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/comments/${newsDetails._id}`
                const response = await axios.get(commentApiEndpoint, {withCredentials: true});
                setComments(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (newsDetails._id) {
                const createCommentApiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/comments/create`;
                const commentObj = {
                    content: newComment,
                    postId: newsDetails._id,
                    author: localStorage?.getItem('user') && JSON?.parse(localStorage?.getItem('user') || '')?.userId,
                }

                await axiosInstance.post(createCommentApiEndpoint, commentObj, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                fetchComments();
                setNewComment('');
            } else {
                console.error('News details not available. Cannot submit comment.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    useEffect(() => {
        fetchNewsDetails();
        fetchComments();
    }, [newsDetails._id]);

    return (
        <div className='flex gap-3'>
            <div className='flex flex-col w-3/4 gap-2'>
                <div className='flex items-center justify-between p-2 text-sm'>
                    <p>Entertainment of Saturday, 13 January 2024</p>
                    <p>Source: <span className='text-blue-500'>www.testing.com</span></p>
                </div>
                <div className=''>
                    <div className='w-3/5'>
                        <img src={newsDetails?.image && `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${newsDetails?.image}`} className='float-left object-cover w-full h-full pr-3'/>
                    </div>
                    <p className='text-sm leading-6'>
                        {newsDetails?.content}
                    </p>
                </div>

                <div className='mt-9'>
                    <p className='text-lg font-bold'>Comments:</p>
                    <div className='flex flex-col items-start gap-2'>
                        <textarea
                            placeholder='Add comment...'
                            className='border border-gray-200 w-72'
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className='px-2 py-1 text-white bg-blue-500 rounded'
                        >
                            Submit
                        </button>
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        {comments?.map((comment: any, index: number) => (
                            <CommentCard
                                key={index}
                                name={comment.author.username}
                                comment={comment.content}
                                datePosted={comment.datePosted}
                            />  
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-1/4 gap-2'>
                <img src='/images/ad2.gif' />
                <img src="/images/ad.gif" className='object-contain w-full'/>
            </div>
        </div>
    )
}

export default NewsDetails