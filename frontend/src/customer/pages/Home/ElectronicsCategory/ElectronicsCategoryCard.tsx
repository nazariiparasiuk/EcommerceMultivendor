import React from 'react'
import { HomeCategory } from '../../../../types/homeCategoryTypes'

const ElectronicsCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
        <img className='object-contain h-10' src={item.image} alt={item.name}/>
        <h2 className='font-semibold text-sm text-center'>{item.name}</h2>
    </div>
  )
}

export default ElectronicsCategoryCard