// import React from 'react'
// import { useEffect } from 'react';

// function PostModal() {
//     useEffect(() => {
//         // Инициализация bootstrap modal через JS, если надо
//         import('bootstrap/dist/js/bootstrap.bundle.min.js');
//       }, []);

//   return (
//     <div>

//         {/* Кнопка для открытия модального окна */}
//       <button
//         type="button"
//         className="btn btn-primary"
//         data-bs-toggle="modal"
//         data-bs-target="#myModal"
//       >
//         Open Modal
//       </button>

//       {/* Модальное окно */}
//       <div
//         className="modal fade"
//         id="myModal"
//         tabIndex="-1"
//         aria-labelledby="myModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="myModalLabel">
//                 Hello!
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               Press ESC key or click the button below to close
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default PostModal

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
          {/* Кастомная кнопка закрытия */}
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

      {/* Вставим стили прямо здесь или вынесем в глобальные */}
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

//CHECK MODAL POST
{
  /* <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel">
              Post Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Закрити"
            ></button>
          </div>
          <div className="modal-body">
            {post ? (
              <PostItem post={post} modal={false} />
            ) : (
              <p>No chosen post.</p>
            )}
          </div>
        </div>
      </div>
    </div> */
}
