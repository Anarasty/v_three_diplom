import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { BsCheck2Square } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { useRouter } from "next/router";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USER_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("Session", session);

  const handleClick = () => {
    if (session) {
      router.push("/create-post");
    } else {
      toast.warning("LOG IN TO CREATE YOUR POST!");
    }
  };
  const handleCheckStats = () => {
    if (session) {
      router.push("/stats");
    } else {
      toast.warning("LOG IN TO SEE STATISTICS!");
    }
  }

  return (
    <div className="d-flex justify-content-between p-3 border-bottom border-primary">
      <Link href="/">
        <img
          src="/Images/logo2.png"
          width={150}
          alt="test2"
          style={{ cursor: "pointer" }}
        />
      </Link>
      <div className="d-flex gap-4 align-items-center">
        <button onClick={handleClick} className="btn btn-primary">
          <span className="d-none d-md-inline">Post Item</span>{" "}
          <BsCheck2Square className="d-inline d-md-none" />
        </button>

        <ToastContainer position="top-center" autoClose={3000} />

        {!session ? (
          <button className="btn btn-outline-primary" onClick={() => signIn()}>
            <span className="d-none d-md-inline">Sign In</span>{" "}
            <BsArrowRightSquareFill className="d-inline d-md-none" />
          </button>
        ) : (
          <button className="btn btn-outline-primary" onClick={() => signOut()}>
            <span className="d-none d-md-inline">Sign Out</span>{" "}
            <BsArrowRightSquareFill className="d-inline d-md-none" />
          </button>
        )}

        <button onClick={handleCheckStats} className="btn btn-primary">
          <span className="d-none d-md-inline">Check Stats</span>{" "}
          <BsFillInfoCircleFill className="d-inline d-md-none" />
        </button>

        <Image
          style={{ cursor: "pointer" }}
          src={session ? session?.user?.image : USER_IMAGE}
          width={40}
          height={40}
          alt={"test1"}
          className="rounded-circle"
          onClick={() => {
            if (session) {
              router.push("/profile");
            } else {
              toast.warning("LOG IN TO VIEW YOUR PROFILE!");
            }
          }}
        />
      </div>
    </div>
  );
}

export default Header;
