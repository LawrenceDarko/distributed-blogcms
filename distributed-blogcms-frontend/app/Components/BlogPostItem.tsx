import axios from 'axios';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface BlogPostItemProps {
  title: string;
  summary: string;
  image?: string;
  author?: string;
  datePosted?: string;
  postId: string;
  slug?: string;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ title, summary, image, author, datePosted, postId, slug }) => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/${postId}`;
  const router = useRouter();


  const onEdit = () => {
    router.push(`/wall/update-blog/${slug}`);
  };

  const onDelete = async() => {
    try {
      const response = await axios.delete(apiEndpoint)
      const resData = response.data;

      console.log(resData)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  };

  const formattedDate = datePosted ? new Date(datePosted).toLocaleDateString() : '';


  return (
    <div className="flex p-4 mb-4 bg-white rounded-md shadow-md">
      {/* Image (if available) */}
      {image && (
        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`} alt="Blog Image" className="object-cover w-1/4 h-32 mb-4 mr-4 rounded-md" />
      )}

      <div className="flex-1">
        {/* Blog Title */}
        <h2 className="mb-2 text-lg font-bold">{title}</h2>

        {/* Summary Content */}
        <p className="mb-4 text-gray-700">{summary.substring(0, 100)}...</p>

        {/* Author and Date Posted */}
        <div className="flex items-center text-gray-500">
          <span className="mr-4">{author}</span>
          <span>{formattedDate}</span>
        </div>

        {/* Edit and Delete Icons */}
        <div className="flex items-center mt-2">
          <button
            className="mr-2 text-blue-500 hover:text-blue-700"
            onClick={onEdit}
            title="Edit Blog Post"
          >
            <FaEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onDelete}
            title="Delete Blog Post"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostItem;
