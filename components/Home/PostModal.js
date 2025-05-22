import React from "react";
import PostItem from "./PostItem";

function PostModal({ post }) {
  return (
    <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "fit-content" }}
      >
        <div className="modal-content border-0 shadow-none position-relative">
          <button
            type="button"
            className="btn btn-close-custom"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            &times;
          </button>

          <div className="modal-body p-0">
            {post ? (
              <PostItem post={post} modal={false} />
            ) : (
              <p>No chosen post.</p>
            )}
          </div>
          {/* <div
            className="modal-body p-3"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {post ? (
              <PostItem post={post} modal={true} />
            ) : (
              <p>No chosen post.</p>
            )}
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .btn-close-custom {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: white;
          color: black;
          border: 2px solid black;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 22px;
          font-weight: bold;
          line-height: 1;
          text-align: center;
          padding: 0;
          cursor: pointer;
          z-index: 10;
        }
        .btn-close-custom:hover {
          background-color: black;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default PostModal;