import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [searchText, setSearchText] = useState();
  const onSearchButtonClick = () => {
    console.log("Search Text:", searchText);
  };
  return (
    <div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="d-flex">
              <div className="input-group">
                <input
                  className="form-control form-control-lg"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(text) => setSearchText(text.target.value)}
                />
                {/* BUTTON EVEN PREVENT NEED TO BE CHECKED */}
                <button
                  className="btn btn-primary px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    onSearchButtonClick();
                  }}
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
