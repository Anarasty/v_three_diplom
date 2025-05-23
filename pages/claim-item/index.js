import React, { useEffect, useState } from "react";
import app from "../../shared/FirebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react"; 

function ClaimItem() {
  const { data: session } = useSession();
  const [inputs, setInputs] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    if (name === "itemId") {
      const foundPost = posts.find((post) => post.id === value);
      setSelectedPost(foundPost || null);
    }
  };

//!WORKING SUB
const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!inputs.name || !inputs.phone || !inputs.message || !inputs.itemId) {
      toast.error("Please fill all fields");
      return;
    }
  
    if (!session) {
      toast.error("You must be logged in to submit a claim.");
      return;
    }
  
    // if (!selectedPost || !selectedPost.email) {
    //     toast.error("Selected item has no associated email. Cannot send claim.");
    //     return;
    //   }
    console.log("Submitting claim with selectedPost:", selectedPost);
    
    try {
      const response = await fetch("/api/sendClaimEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: session.user.name,
          senderEmail: session.user.email,
          senderImage: session.user.image,
          message: inputs.message,
          phone: inputs.phone,
          selectedPost: selectedPost, 
        }),
      });
  
      if (response.ok) {
        toast.success("Request sent successfully!");
      } else {
        toast.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error sending claim:", error);
      toast.error("Failed to send request");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <h2 className="h4 mb-4 text-center">Claim an Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <textarea
              name="message"
              placeholder="Message"
              rows="3"
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <select
              name="itemId"
              onChange={handleChange}
              required
              className="form-select"
              defaultValue=""
            >
              <option value="" disabled>
                Select an Item
              </option>
              {posts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title || "Unnamed Item"}
                </option>
              ))}
            </select>
          </div>
  
          {selectedPost && (
            <div className="card mb-3" style={{ maxWidth: "400px", margin: "0 auto" }}>
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={selectedPost.image || "/placeholder.png"}
                    alt={selectedPost.title}
                    className="img-fluid rounded-start"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body p-2">
                    <h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
                      {selectedPost.title || "No Title"}
                    </h5>
                    <p className="card-text mb-1" style={{ fontSize: "0.875rem" }}>
                      {selectedPost.desc || "No Description"}
                    </p>
  
                    {selectedPost.status && (
                      <div
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          color:
                            selectedPost.status.toUpperCase() === "LOST"
                              ? "#dc3545"
                              : "#198754",
                          backgroundColor:
                            selectedPost.status.toUpperCase() === "LOST"
                              ? "#f8d7da"
                              : "#d1e7dd",
                        }}
                      >
                        {selectedPost.status.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
  
          <button type="submit" className="btn btn-primary w-100">
            Submit Claim
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClaimItem;