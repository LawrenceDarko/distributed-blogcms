'use client'

import { useState } from "react";
import axios from 'axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreateBlog = () => {
    const axiosInstance = useAxiosPrivate()
    const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/create`;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');
    const [message, setMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('entertainment');

    const handleCreateBlog = async () => {
        
          const tagsArray = tags.split(',').map(tag => tag.trim());
          const slug = title.toLowerCase().replace(/\s+/g, '-');
      
          const postData = {
            title,
            content,
            tags: tagsArray,
            category: selectedCategory,
            image,
            slug,
            author: localStorage?.getItem('user') && JSON?.parse(localStorage?.getItem('user') || '')?.userId,
          };
      
          console.log(postData);
      
          if (!postData.title || !postData.content || !postData.slug) {
            console.error('Missing required fields in postData:', postData);
            setMessage('Missing required fields in the form')
            return;
          }
        try {
        const response = await axiosInstance.postForm(apiEndpoint, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
          });
      
          const resData = await response.data;
          setMessage(resData?.response?.message)
          console.log('Blog created:', resData);

          setContent('')
          setImage(null)
          setTitle('')
          setTags('')
      
        } catch (error: any) {
          console.error('Error creating blog:', error);
          setMessage(error?.response?.data?.error || error?.response?.data)
        }
      };
      

    const handleImageChange = (e: any) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleSelectChange = (e: any) => {
      setSelectedCategory(e.target.value);
    };

    return (
        <div>
        <h2 className="mb-4 text-2xl font-bold">Create Blog</h2>
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
            <select
              value={selectedCategory}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <optgroup label="Choose a category">
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="business">Business</option>
              </optgroup>
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
            onClick={handleCreateBlog}
        >
            Create Post
        </button>
        {message && <div className="p-3 italic text-gray-500">{message}</div>}
        </div>
  );
};

export default CreateBlog;
