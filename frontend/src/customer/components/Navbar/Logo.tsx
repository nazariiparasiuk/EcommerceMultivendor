import React from 'react'

const Logo = () => (
  <div className='flex items-center gap-2'>
    <svg width="26" height="20" viewBox="0 0 19 16" fill="none">
      <path d="M2 2 L8 8 L2 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className='text-primary-color'/>
      <path d="M11 2 L17 8 L11 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className='text-primary-color'/>
    </svg>
    <span className='font-display font-bold text-xl tracking-tight text-gray-900'>
      sell<span className='text-primary-color'>way</span>
    </span>
  </div>
)

export default Logo