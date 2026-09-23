import React from 'react'
import DealCard from './DealCard'
import { useAppSelector } from '../../../../State/Store';

const Deal = () => {
  const {customer} = useAppSelector(store => store);

  return (
    <div className='px-5 lg:px-20'>
        <div className='flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0'>
          {customer.homePageData?.deals.slice(0,6).map((item) => <DealCard key={item.category.categoryId} item={item}/>)}
        </div>
    </div>
  )
}

export default Deal