import React from 'react'
import { Deal } from '../../../../types/dealTypes'

const DealCard = ({item}:{item:Deal}) => {
  return (
    /*<div className='w-[13rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] border-emerald-600 w-full h-[12rem] object-cover object-top' 
        src="https://cdn.pixabay.com/photo/2014/12/10/12/28/iphone-563071_1280.jpg" alt=''/>
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>Mobile Phone</p>
            <p className='text-2xl font-bold'>20% OFF</p>
            <p className='text-balance text-lg'>shop now</p>
        </div>
    </div>*/
    <div className="w-56 cursor-pointer group transition-all duration-300 hover:scale-105">
        <div className="relative rounded-t-xl overflow-hidden border-4 border-emerald-500">
            <img
            className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-500"
            src={item.category.image}
            alt=""
            />
        </div>
        <div className="bg-white text-center p-3 rounded-b-xl border-x border-b border-gray-200 shadow-md">
            <p className="text-lg font-semibold text-gray-800">{item.category.name}</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{item.discount}% OFF</p>
            <p className="text-sm uppercase tracking-wide text-emerald-500 mt-1">Shop Now</p>
        </div>
    </div>


    
  )
}

export default DealCard