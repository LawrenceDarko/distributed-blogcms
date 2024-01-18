import NewsDetails from '@/app/Components/NewsDetails'
import React from 'react'


const PostDetails = ({ params }: { params: { postId: string } }) => {
  return (
    <div>
        <NewsDetails />
    </div>
  )
}

export default PostDetails