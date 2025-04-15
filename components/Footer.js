import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 w-100 mt-2">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} <span className='text-primary'>Re</span>Claim. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
