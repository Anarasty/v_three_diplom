import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function CreatePost() {
    const {data:session}=useSession();
    const router=useRouter();
    useEffect(()=>{
        if(!session){
            router.push('/')
        }
    })
  return (
    <div>
      CreatePost
    </div>
  )
}

export default CreatePost
