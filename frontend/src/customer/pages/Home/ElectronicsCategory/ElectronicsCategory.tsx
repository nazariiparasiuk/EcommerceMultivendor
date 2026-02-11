import React from 'react'
import ElectronicsCategoryCard from './ElectronicsCategoryCard'
import { useAppSelector } from '../../../../State/Store';

const ElectronicsCategory = () => {
  const {customer} = useAppSelector(store => store);
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {customer.homePageData?.electronics.slice(0,7).map((item) => <ElectronicsCategoryCard item={item}/>)}
    </div>
  )
}

export default ElectronicsCategory