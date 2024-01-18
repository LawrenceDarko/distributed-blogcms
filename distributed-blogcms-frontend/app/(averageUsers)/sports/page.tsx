import NewsPageComp from '@/app/Components/NewsPageComp'
import React from 'react'

const SportsPage = () => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/`

  return (
    <div>
      <NewsPageComp title='Sports News' apiEndpoint={apiEndpoint} category='sports'/>
    </div>
  )
}

export default SportsPage