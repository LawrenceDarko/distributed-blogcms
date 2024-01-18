import NewsPageComp from '@/app/Components/NewsPageComp'
import React from 'react'

const GeneralNewsFeed = () => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/`
  
  return (
    <div>
      <NewsPageComp title='General News' apiEndpoint={apiEndpoint}/>
    </div>
  )
}

export default GeneralNewsFeed