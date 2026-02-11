import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const ElectronicTable = () => {
  const {customer} = useAppSelector(store => store);
  return (
    <HomeCategoryTable data={customer.homePageData?.electronics || []}/>
  )
}

export default ElectronicTable