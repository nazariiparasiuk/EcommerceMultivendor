import React from 'react'
import Logo from '../Navbar/Logo'

const Footer = () => {
  return (
    <footer className='border-t border-gray-200 mt-10'>
      <div className='max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-5 lg:px-20 py-8'>
        <Logo/>
        <p className='text-xs text-gray-400'>© 2026 Sellway. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer