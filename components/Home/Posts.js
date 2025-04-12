import React, { useEffect } from 'react'
import PostItem from './PostItem'

function Posts({posts}) {
  useEffect(()=>{
    console.log("Posts",posts)
  })
  return (
    // <div>
    //   {posts.map((item)=>(
    //     <PostItem post={item}/>
    //   ))}
    // </div>
    <div className="container mt-5 px-3">
  <div className="row g-4">
    {posts.map((item) => (
      <div className="col-12 col-lg-4">
        <PostItem post={item} />
      </div>
    ))}
  </div>
</div>
  )
}

export default Posts
