import React from "react";
import { useRouter } from "next/router";

function HomePage() {
      const router = useRouter();
      const handleNavigate = () => {
        router.push("/");
      };
    
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      //   style={{ minHeight: "100vh" }}
    >
      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "700px", overflow: "hidden" }}
            >
              <img
                src="./Images/collaje.png"
                alt="Collage"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="border p-4 bg-white d-flex flex-column justify-content-center "
              style={{ maxWidth: "100%", height: "530px" }}
            >
              <h2 className="fw-bold">
                Lost Something? We'll Help You Find It
              </h2>
              <p className="mt-3">
                Connect with people who care. Report lost items or search for
                found ones — quickly and easily.
              </p>
              {/* <a href="#" className="btn btn-dark mt-3">
                Go to website
              </a> */}
              <button className="btn btn-primary mt-3" onClick={handleNavigate}>Go to website</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
