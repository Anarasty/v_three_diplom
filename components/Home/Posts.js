import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";

function Posts({ posts }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log("Posts", posts);
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="container mt-5 px-3">
      <PostModal post={post} />
      <div className="row g-4">
        {posts.map((item, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-4"
            onClick={() => setPost(item)}
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            <PostItem post={item} modal={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;