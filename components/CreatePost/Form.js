import React, { useEffect, useState } from "react";
import Data from "../../shared/Data";
import { useSession } from "next-auth/react";

function Form() {
    const [inputs, setInputs]=useState({})
    const {data:session}=useSession()
    useEffect(()=>{
        if (session) {
            setInputs((values) => ({ ...values, userName: session.user?.name }));
            setInputs((values) => ({ ...values, userImage: session.user?.image }));
            setInputs((values) => ({ ...values, email: session.user?.email }));
          }
        }, [session]);

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs((values)=>({...values,[name]:value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("OnSubmit", inputs)
    }
  return (
    <div>
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

        {/* AVAILABLE LATER!!!! */}
        {/* <div className="mb-3">
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      accept="image/gif, image/jpeg, image/png"
      className="form-control"
    />
  </div> */}

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
