import Image from 'next/image'
import React from 'react'

const USER_IMAGE='https://res.cloudinary.com/dqff5bsso/image/upload/c_thumb,w_200,g_face/v1744380653/samples/look-up.jpg'
function Header() {
  return (
    <div className='d-flex justify-content-between p-3 border-bottom border-primary'>
      <img src='./Images/logo.png' width={150} alt='test2'></img>
      <div className='d-flex gap-4 align-items-center'>
        <button className='btn btn-primary'>Post Item</button>
        <button className='btn btn-outline-primary'>Sign In</button>
        <Image src={USER_IMAGE} width={40} height={40} alt={'test1'} className='rounded-circle'/>
      </div>
    </div> 
  )
}

export default Header
