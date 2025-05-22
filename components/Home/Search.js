import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Fuse from "fuse.js";

function Search({ posts, setFilteredPosts }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value) {
      setFilteredPosts(posts);
      return;
    }

    const fuse = new Fuse(posts, {
      keys: ["title", "desc", "location", "zip"],
      threshold: 0.3, // sensitivity (0 = hard, 1 = easy)
    });

    const results = fuse.search(value);
    const filtered = results.map((res) => res.item);
    setFilteredPosts(filtered);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input
                className="form-control form-control-lg"
                type="search"
                placeholder="Search lost item..."
                aria-label="Search"
                value={searchText}
                onChange={handleSearch}
              />
              <button className="btn btn-primary px-4" disabled>
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;