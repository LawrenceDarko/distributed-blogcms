import Link from 'next/link';
import React from 'react';


export interface NewsPosterProps {
    title?: string;
    image: string;
    slug: string;
    category: string;
    content?:string;
}

const NewsPoster: React.FC<NewsPosterProps> = ({ content, image, title, slug }) => {
  return (
    <Link href={`feed/details/${slug}`}
      className='h-full w-[60%] relative'
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className='absolute w-full h-full overflow-hidden bg-gradient-to-t from-black to-transparent'>
        <div className='relative h-full text-white'>
            <div className='absolute bottom-0 p-5'>
                <h2 className='mb-2 text-xl font-bold'>{title}</h2>
                <p className='text-md'>
                    {content?.substring(0, 100)}...
                </p>
            </div>
          
        </div>
      </div>
    </Link>
  );
};

export default NewsPoster;
