import React from "react";

function UserInfo({ user }) {
  const defaultImage = "./Images/placeholder.jpg"; 

  const userImage = user?.userImage || defaultImage;
  const userName = user?.userName || "Anonymous";
  const userEmail = user?.email || "Email unknown";

  return (
    <div className="mt-3">
      <p className="fw-bold mb-2">Posted By:</p>
      <div className="d-flex align-items-center gap-2">
        <img
          src={userImage}
          alt="user"
          width={40}
          height={40}
          className="rounded-circle border"
          style={{ objectFit: "cover" }}
        />
        <div>
          <div className="fw-medium" style={{ fontSize: "14px" }}>
            {userName}
          </div>
          <div className="text-muted" style={{ fontSize: "14px" }}>
            {userEmail}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;