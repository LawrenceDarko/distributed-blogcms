import NewsPageComp from '@/app/Components/NewsPageComp'
import React from 'react'

const BusinessPage = () => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/`

  return (
    <div>
      <NewsPageComp title='Business News' apiEndpoint={apiEndpoint} category='business'/>
    </div>
  )
}

export default BusinessPage