'use client'

import BlogPostItem from '@/app/Components/BlogPostItem';
import CreateBlog from '@/app/Components/CreateBlog';
import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface BlogPost {
  title: string;
  content: string;
  author: { username: string };
  slug: string;
  datePosted: string;
  _id: string;
  image: string;
}


interface BlogPostResponse {
  data: BlogPost[];
}

const MyBlogPosts = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');



  useEffect(() => {
    const user = localStorage.getItem('user') as any;
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get<BlogPostResponse[] | any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/author/${JSON.parse(user).userId}`);
        const posts = response?.data?.data;
        console.log(posts)

        setBlogPosts(posts);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
        setErrorMsg(error?.response?.data?.message)
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">My Blog Posts</h2>
      {errorMsg && <p className="italic text-gray-500">{errorMsg}</p>}
      {blogPosts.map((post) => (
        <BlogPostItem
          key={post._id}
          title={post.title}
          slug={post.slug}
          summary={post.content}
          author={post.author.username}
          datePosted={post.datePosted}
          postId={post._id}
          image={post.image}
        />
      ))}
    </div>
  );
};







const Wall = () => {
  const [selectedItem, setSelectedItem] = useState('My Blog Posts');

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-200">
        <div
          className={`cursor-pointer p-2 mb-2 ${
            selectedItem === 'My Blog Posts' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => setSelectedItem('My Blog Posts')}
        >
          My Blog Posts
        </div>
        <div
          className={`cursor-pointer p-2 ${selectedItem === 'Create Blog' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setSelectedItem('Create Blog')}
        >
          Create Blog
        </div>
      </div>
      <div className="w-3/4 p-4">
        {selectedItem === 'My Blog Posts' ? <MyBlogPosts /> : <CreateBlog />}
      </div>
    </div>
  );
};

export default Wall;
