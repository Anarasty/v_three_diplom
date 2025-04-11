import Image from 'next/image'
import React from 'react'

const USER_IMAGE='https://res.cloudinary.com/dqff5bsso/image/upload/c_thumb,w_200,g_face/v1744380653/samples/look-up.jpg'
function Header() {
  return (
    <div>
      <img src='./Images/logo.png' width={150} alt='test2'></img>
      <div>
        <button className='bg-black p-2 px-3 text-white rounded-full'>Post Item</button>
        <button className='bg-white text-gray-500 p-2 px-3 border-[1px] rounded-full'>Sign In</button>
      </div>
      {/* <Image src={USER_IMAGE} width={40} height={40} alt={'test1'}/> */}
    </div> 
  )
}

export default Header
