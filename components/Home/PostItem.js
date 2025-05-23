import React from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import UserInfo from "./UserInfo";
import Image from "next/image";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function PostItem({ post, modal = false }) {
  const defaultImage = "./Images/placeholder.jpg";
  if (!post) return null;

  return (
    <div
      className="card"
      style={{
        width: modal ? "20rem" : "40rem",
        height: modal ? "30rem" : "auto",
        maxHeight: modal ? "none" : "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <div style={{ height: "200px", overflow: "hidden" }}> */}
      <div style={{ height: modal ? "15rem" : "35rem", overflow: "hidden" }}>
        <Image
          className="card-img-top"
          src={post.image || defaultImage}
          alt="Card image cap"
          width={500} 
          height={300} 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          unoptimized={post.image?.startsWith("http")}
          loading="lazy"
        />
      </div>
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{
          flexGrow: 1,
        }}
      >
        <h5 className="card-title">{post.title}</h5>
        <div className="d-flex align-items-center text-warning gap-2 mb-2">
          <BsCalendar2EventFill />
          {formatDate(post.date)}
        </div>
        <div className="d-flex align-items-center text-primary gap-2 mb-2">
          <FaLocationDot />
          {post.location}, {post.zip}
        </div>
        <p className="card-text">
          {modal ? truncateText(post.desc, 50) : post.desc}
        </p>
        <div
          className={`d-inline p-2 text-white rounded text-center text-uppercase ${
            post.status === "found" ? "bg-success" : "bg-danger"
          }`}
        >
          {post.status}
        </div>

        {!modal && <UserInfo user={post} />}
      </div>
    </div>
  );
}

export default PostItem;
