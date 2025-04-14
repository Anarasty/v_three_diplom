import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Form from "../../components/CreatePost/Form";

function CreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <div className="d-flex justify-content-center">
      <div className="p-4 mt-4 col-lg-4 col-md-6">
        <h1 className="fw-bold text-primary">POST ITEM</h1>
        <p>Add some information about the item you have lost/found.</p>
        <Form />
      </div>
    </div>
  );
}

export default CreatePost;
