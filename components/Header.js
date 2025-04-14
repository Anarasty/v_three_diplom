import Image from 'next/image'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

import { BsCheck2Square } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useRouter } from 'next/router';

const USER_IMAGE='https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
function Header() {
  const router = useRouter();
  const { data: session } = useSession()
  console.log("Session",session)
  return (
    <div className='d-flex justify-content-between p-3 border-bottom border-primary'>
      <img src='./Images/logo2.png' width={150} alt='test2'></img>
      <div className='d-flex gap-4 align-items-center'>
        <button onClick={()=>router.push('/create-post')} className='btn btn-primary'><span className="d-none d-md-inline">Post Item</span> <BsCheck2Square className="d-inline d-md-none"/>
        </button>

       {!session?<button className='btn btn-outline-primary' onClick={()=>signIn()}><span className="d-none d-md-inline">Sign In</span> <BsArrowRightSquareFill className="d-inline d-md-none"/>
        </button>
        :<button className='btn btn-outline-primary' onClick={()=>signOut()}><span className="d-none d-md-inline">Sign Out</span> <BsArrowRightSquareFill className="d-inline d-md-none"/>
        </button>}

        <Image src={session?session?.user?.image:USER_IMAGE} width={40} height={40} alt={'test1'} className='rounded-circle'/>
      </div>
    </div> 
  )
}

export default Header
