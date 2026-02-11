import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='max-w-6xl mx-auto p-5 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[50%] space-y-2'>
        <img src='https://nobero.com/cdn/shop/files/Hopet-shirtclassic.jpg'/>

        <div>
          <div>
            <p className='font-bold text-xl'>Clothing</p>
            <p className='text-lg text-gray-600'>Men's White Shirt</p>
          </div>
          <div>
            <div className='price flex items-center gap-3 mt-5 text-2xl'>
              <span className='font-sans text-gray-800'>
                $ 40
              </span>
              <span className='line-through text-gray-400'>
                $ 99
              </span>
              <span className='text-primary-color font-semibold'>
                60%
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className='ml-5 space-y-5 w-full'>
        {[1,1,1,1,1,1].map((item) => <div className='space-y-3'><ReviewCard /><Divider /></div>)}
      </section>
    </div>
  )
}

export default Review