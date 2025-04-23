// import React, { useEffect, useState } from "react";
// import Data from "../../shared/Data";
// import { useSession } from "next-auth/react";
// import app from "./../../shared/FirebaseConfig";
// import { doc, getFirestore, setDoc } from "firebase/firestore";

// function Form() {
//     const [inputs, setInputs]=useState({})
//     const {data:session}=useSession()
//     const db = getFirestore(app)
//     useEffect(()=>{
//         if (session) {
//             setInputs((values) => ({ ...values, userName: session.user?.name }));
//             setInputs((values) => ({ ...values, userImage: session.user?.image }));
//             setInputs((values) => ({ ...values, email: session.user?.email }));
//           }
//         }, [session]);

//     const handleChange=(e)=>{
//         const name=e.target.name;
//         const value=e.target.value;
//         setInputs((values)=>({...values,[name]:value}))
//     }
//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         console.log("OnSubmit", inputs)
//         await setDoc(doc(db, "posts", Date.now().toString()), inputs)
//     }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             required
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <textarea
//             name="desc"
//             placeholder="Write Description here"
//             required
//             onChange={handleChange}
//             className="form-control"
//             rows="3"
//           />
//         </div>

//         <div className="mb-3">
//           <input
//             type="date"
//             name="date"
//             required
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <input
//             type="text"
//             placeholder="Location"
//             name="location"
//             required
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <input
//             type="text"
//             placeholder="Zip"
//             name="zip"
//             required
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <select
//             name="itemCategory"
//             onChange={handleChange}
//             required
//             className="form-select"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Select Item Category
//             </option>
//             {Data.ItemList.map((item) => (
//               <option key={item.id} value={item.name}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-3">
//           <select
//             name="status"
//             onChange={handleChange}
//             required
//             className="form-select"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Select Status
//             </option>
//             <option value="lost">Lost</option>
//             <option value="found">Found</option>
//           </select>
//         </div>

//         {/* AVAILABLE LATER!!!! */}
//         {/* <div className="mb-3">
//     <input
//       type="file"
//       onChange={(e) => setFile(e.target.files[0])}
//       accept="image/gif, image/jpeg, image/png"
//       className="form-control"
//     />
//   </div> */}

//         <button type="submit" className="btn btn-primary w-100">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Form;

// OLD NOIMAGE CODE UP!!!

import React, { useEffect, useState } from "react";
import Data from "../../shared/Data";
import { useSession } from "next-auth/react";
import app from "./../../shared/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);

  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (session) {
      setInputs((values) => ({ ...values, userName: session.user?.name }));
      setInputs((values) => ({ ...values, userImage: session.user?.image }));
      setInputs((values) => ({ ...values, email: session.user?.email }));
    }
  }, [session]);

  useEffect(() => {
    if (submit) {
      savePost();
    }
  }, [submit]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const zip = inputs.zip || "";
    const desc = inputs.desc || "";

    if (zip.length !== 5) {
      toast.error("Zip code must be exactly 5 characters long.");
      return;
    }

    if (desc.length === 0 || desc.length > 200) {
      toast.error("Description must be between 1 and 200 characters.");
      return;
    }

    if (file) {
      const storageRef = ref(storage, "uploads/" + file.name);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setInputs((values) => ({ ...values, image: url }));
        setSubmit(true);
      } catch (error) {
        toast.error("Image upload failed!");
        console.error("Upload error", error);
      }
    } else {
      setInputs((values) => ({ ...values, image: "" }));
      setSubmit(true);
    }
  };

  const savePost = async () => {
    try {
      await setDoc(doc(db, "posts", Date.now().toString()), inputs);
      toast.success("Post Created Successfully");
    } catch (error) {
      toast.error("Failed to save post!");
      console.error("Firestore error", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <textarea
            name="desc"
            placeholder="Write Description here"
            required
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Location"
            name="location"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Zip"
            name="zip"
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <select
            name="itemCategory"
            onChange={handleChange}
            required
            className="form-select"
            defaultValue=""
          >
            <option value="" disabled>
              Select Item Category
            </option>
            {Data.ItemList.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <select
            name="status"
            onChange={handleChange}
            required
            className="form-select"
            defaultValue=""
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/gif, image/jpeg, image/png"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
