'use client'

import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UpdateBlog = () => {
    const axiosInstance = useAxiosPrivate()
    const blogSlug = useParams().blogSlug;
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/${blogSlug}`;
    const getBlogApiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/slug/${blogSlug}`;
    // console.log(apiEndpoint);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('entertainment');
    

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(getBlogApiEndpoint);
            const blogData = response.data.data; 

            console.log(blogData)

            setTitle(blogData.title || '');
            setContent(blogData.content || '');
            setTags((blogData.tags || []).join(','));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog data:', error);
            setLoading(false);
        }
        };

        fetchData();
    }, [apiEndpoint]);

    const handleUpdateBlog = async () => {
        const tagsArray = tags.split(',').map(tag => tag.trim());

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', selectedCategory);
        formData.append('tags', JSON.stringify(tagsArray));
        formData.append('slug', title.toLowerCase().replace(/\s+/g, '-'));
        formData.append('author', JSON.parse(localStorage.getItem('user') || '').userId);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axiosInstance.patch(apiEndpoint, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            });

            const resData = response.data;
            console.log('Blog updated:', resData);
            setMessage(resData.message)

            setContent('');
            setImage(null);
            setTitle('');
            setTags('');

        } catch (error: any) {
            console.error('Error updating blog:', error);
            setMessage(error?.response?.data?.error || error?.response?.data)
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        setImage(selectedImage || null);
    };

    const handleSelectChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div></div>
        <h2 className="mb-4 text-2xl font-bold">Update Blog</h2>
        {message && <p className="p-3 italic text-gray-500">{message}</p>}
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
            Title:
            </label>
            <input
                type="text"
                id="title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="content">
            Content:
            </label>
            <textarea
                id="content"
                className="w-full h-56 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="tags">
            Tags (separate tags with comma):
            </label>
            <input
                type="text"
                id="tags"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="category">
                category:
            </label>
            <select id="fruitSelect" value={selectedCategory} onChange={handleSelectChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="business">Business</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="image">
            Image:
            </label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
        <button
            className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={handleUpdateBlog}
        >
            Update Post
        </button>
        </div>
    );
};

export default UpdateBlog;
