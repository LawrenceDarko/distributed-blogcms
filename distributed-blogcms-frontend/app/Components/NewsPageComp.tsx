'use client'

import React, { useEffect, useState } from 'react'
import NewsPoster from './NewsPoster';
import NewsItem from './NewsItem';
import SideNewsItem from './SideNewsItem';
import axios from 'axios';

interface NewsPageCompProps {
    apiEndpoint: string;
    title?: string;
    category?: string;
}

interface NewsItemProps {
    title: string;
    image: string;
    slug: string;
    category: string;
    content?:string;
}

const NewsPageComp: React.FC<NewsPageCompProps> = ({apiEndpoint, title, category}) => {

    const [newsData, setNewsData] = useState<NewsItemProps[]>([]);
    const [randomPost, setRandomPost] = useState<NewsItemProps | any>(null);

    // console.log("NEWS DATA:",randomPost)

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(apiEndpoint);
            let filteredData = response?.data?.data;
            // console.log(filteredData)

            // Filter the results based on the provided category
            if (category) {
                filteredData = response?.data?.data?.filter((item: any) => item.category === category);
            }

            setNewsData(filteredData);
            // Select a random post from the data
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            setRandomPost(filteredData[randomIndex]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [apiEndpoint, category]);

    return (
        <div className='flex gap-3'>
            <div className='flex flex-col w-full gap-2 md:w-3/4'>
                <div className='flex items-center px-3 font-bold bg-gray-200 h-9'>{title || 'General News'}</div>

                <div className='flex w-full h-64 gap-2 mb-2'>
                    <NewsPoster 
                        title={randomPost?.title}
                        image={randomPost?.image}
                        content={randomPost?.content}
                        slug={randomPost?.slug}
                        category={randomPost?.category}
                    />
                    <div className='h-full w-[40%] bg-gray-100'>
                        <img src='/images/ad.gif' className='object-cover w-full h-full'/>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {newsData?.map((news) => (
                        <NewsItem 
                            key={news.slug}
                            title={news.title}
                            image={news.image}
                            slug={news.slug}
                            category={news.category}
                        />
                    ))}
                </div>
            </div>
            <div className='flex-col hidden gap-2 md:flex md:w-1/4'>
                <div className='bg-gray-200 h-9'></div>
                <div className='flex flex-col gap-3'>
                    <SideNewsItem 
                        title='Business'
                        borderColor='border-[#02AAE9]'
                        description='This is the description for this card'
                    />
                    <SideNewsItem 
                        title='Entertainment'
                        borderColor='border-[#963A8C]'
                        description='This is the description for this card'
                    />
                    <SideNewsItem 
                        title='Sports'
                        borderColor='border-[#FF0001]'
                        description='This is the description for this card'
                    />
                    <SideNewsItem 
                        title='News'
                        borderColor='border-[#70A703]'
                        description='This is the description for this card'
                    />
                    <SideNewsItem 
                        title='Wall'
                        borderColor='border-[#FF5A0A]'
                        description='This is the description for this card'
                    />
                </div>
                <div className='w-full h-auto'>
                    <img src='/images/ad.gif' className='object-cover w-full h-full'/>
                </div>
            </div>
        </div>
    )
}

export default NewsPageComp