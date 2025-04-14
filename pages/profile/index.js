import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import app from "../../shared/FirebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import PostItem from '../../components/Home/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { data: session } = useSession();
  const [userPost, setUserPost]=useState([])
  const db = getFirestore(app);

  useEffect(() => {
    getUserPost();
  }, [session]);

  const getUserPost = async () => {
    if(session?.user.email){
      const q = query(
        collection(db, "posts"),
        where("email", "==", session?.user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((postDoc) => {
        //console.log(doc.id, " => ", doc.data());
        let data=postDoc.data()
        data.id=postDoc.id
        setUserPost(userPost=>[...userPost,data])
      });
    }
  };

  const onDeletePost=async(id)=>{
    try {
      await deleteDoc(doc(db, "posts", id));
      toast.success("Post successfully deleted!");
      setUserPost(userPost.filter(post => post.id !== id)); // Обновляем список без перезагрузки
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  }

  return (
    <div className="container mt-4 d-flex flex-column align-items-center justify-content-center">
      <h2 className="h3 fw-bold text-primary mb-3">Profile</h2>
      <p className="mb-4">Manage your posts</p>
  
      {userPost.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="./Images/empty_post.png"
            alt="No posts"
            style={{ maxWidth: "300px", width: "100%" }}
          />
          <p className="mt-3 text-muted">You have no posts yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {userPost.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="card h-100 shadow-sm border-0 d-flex flex-column"
                style={{ minHeight: "500px", width: "20rem" }}
              >
                <PostItem post={item}/>
                {/* ADD into PostItme to not show the author post name modal={true} */}
                <div className="mt-auto p-3">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => onDeletePost(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Profile;


// OLD DIV
{/* <div className="p-4 mt-4 col-lg-4 col-md-6">
      <h2 className="h3 fw-bold text-primary">Profile</h2>
      <p>Manage your posts</p>
      <div>
        {userPost&&userPost?.map((item)=>(
          <div>
            <p>{item.title}</p>
            <PostItem post={item}/>
            <button className='bg-red-400 w-full p-1 mt-1
        rounded-md text-white' 
       onClick={()=>onDeletePost(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div> */}