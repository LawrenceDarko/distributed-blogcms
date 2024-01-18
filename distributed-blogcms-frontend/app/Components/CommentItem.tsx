import Link from 'next/link';
import React from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { Link } from 'react-router-dom'; // Use your preferred routing library

interface CommentCardProps {
  name: string;
  comment: string;
  datePosted: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, comment, datePosted }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
  }).format(new Date(datePosted));

  return (
    <div className="p-4 my-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <p className="font-semibold text-blue-500 hover:underline">
          {name}
        </p>
        <span className="ml-auto text-sm text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-800">{comment}</p>
    </div>
  );
};

export default CommentCard;




