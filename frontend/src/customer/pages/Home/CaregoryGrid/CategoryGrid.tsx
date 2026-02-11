import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' 
            src="https://cdn.pixabay.com/photo/2020/06/04/17/35/garment-racks-5259773_1280.jpg" alt=""/>
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' 
            src="https://cdn.pixabay.com/photo/2016/12/01/18/17/mobile-phone-1875813_1280.jpg" alt=""/>
        </div>

        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md'
            src="https://cdn.pixabay.com/photo/2022/01/25/12/16/laptop-6966045_1280.jpg" alt=""/>
        </div>

        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md'
            src="https://cdn.pixabay.com/photo/2024/01/11/14/40/ai-generated-8501940_1280.jpg" alt=""/>
        </div>
        
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md'
            src="https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg" alt=""/>
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md'
            src="https://cdn.pixabay.com/photo/2018/02/24/20/39/clock-3179167_1280.jpg" alt=""/>
        </div>
    </div>
    
  )
}

export default CategoryGrid