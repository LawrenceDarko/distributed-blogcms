import NewsPageComp from '@/app/Components/NewsPageComp'
import React from 'react'

const EntertainmnetPage = () => {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogposts/`

  return (
    <div>
      <NewsPageComp title='Entertainment News' apiEndpoint={apiEndpoint} category='entertainment'/>
    </div>
  )
}

export default EntertainmnetPage