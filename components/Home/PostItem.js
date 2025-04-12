import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

{
  /* <BsCalendar2EventFill /> <FaLocationDot /> */
}

function PostItem({ post }) {
  return (
    <div className="card" style={{ width: "20rem", height: "450px", display: "flex", flexDirection: "column" }}>
      {/* <img className="card-img-top" src={post.image} alt="Card image cap" /> */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          className="card-img-top"
          src={post.image}
          alt="Card image cap"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <div className="d-flex align-items-center text-warning gap-2 mb-2">
          <BsCalendar2EventFill />
          {post.date}
        </div>
        <div className="d-flex align-items-center text-primary gap-2 mb-2">
          <FaLocationDot />
          {post.location}, {post.zip}
        </div>
        <p className="card-text">{post.desc}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default PostItem;
