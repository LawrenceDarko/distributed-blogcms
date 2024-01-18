import Link from 'next/link';
import React from 'react';

interface NewsItemProps {
    image: string;
    title: string;
    slug: string
    category?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ image, title, slug, category }) => {

  const categoryColor = category === 'entertainment' ? 'bg-red-500':
                        category === 'sports' ? 'bg-blue-500':
                        category === 'politics' ? 'bg-green-500':
                        category === 'business' ? 'bg-yellow-500': 'bg-gray-500';


  return (
    <Link href={`feed/details/${slug}`} className="w-full mb-2 overflow-hidden bg-gray-100 border h-[292px] flex flex-col cursor-pointer md:w-[32.5%]">
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`}
        alt="News Image"
        className="object-cover w-full h-1/2"
      />


      <div className="relative p-4 h-1/2">
          <h2 className="mb-2 font-bold text-left cursor-pointer text-md hover:text-red-500">
              {title.substring(0, 55)}
          </h2>
          <div className='absolute flex bottom-4 left-4'>
            <div className={`${categoryColor} px-2 py-[2px] text-white text-xs`}>{category}</div>
          </div>
      </div>
    </Link>
  );
};

export default NewsItem;
