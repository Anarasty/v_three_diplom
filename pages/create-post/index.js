import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function CreatePost() {
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);

  return (
    <div className="container mt-4">
      <h2>Create Post</h2>
      {/* CREATE POST FORM HERE */}
    </div>
  )
}

export default CreatePost
