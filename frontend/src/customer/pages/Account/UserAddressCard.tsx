import React from 'react'

const UserAddressCard = () => {
  return (
    <div className='border rounded-xl p-4 flex gap-4 items-start hover:shadow-md transition'>
          <div className='space-y-2'>
            <h1 className='font-semibold text-base'>Nazarii</h1>
            <p className='max-w-[320px] text-sm text-gray-700 leading-relaxed'>
              Test test test test test test - 530068
            </p>
            <p className='text-sm'>
              <strong>Mobile:</strong> 9876543210
            </p>
          </div>
    </div>
  )
}

export default UserAddressCard