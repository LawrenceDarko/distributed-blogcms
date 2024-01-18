import React from 'react';

interface SideNewsItemProps {
  title: string;
  image?: string;
  description: string;
  borderColor: string
}

const SideNewsItem: React.FC<SideNewsItemProps> = ({ title, image, description, borderColor }) => {
  return (
    <div className="bg-gray-200 flex-col h-28 overflow-hidden flex">
      <hr className={`border-2 w-full ${borderColor}`}/>
      <p className='font-semibold text-sm pl-2'>{title}</p>
      <div className='w-full h-full mb-2 p-2 flex'>
        <div className='w-1/2 h-full'>
          <img
            src="/images/jill.jpg"
            alt="News Image"
            className="w-full h-full object-cover"
          />
        </div>
    
        <div className="pl-2 w-1/2">
          <h2 className="text-sm font-semibold">{description?.substring(0, 40) || 'This is the description'}</h2>
        </div>
      </div>
      
    </div>
  );
};

export default SideNewsItem;
