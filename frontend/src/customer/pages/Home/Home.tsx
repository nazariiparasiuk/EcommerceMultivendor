import React from 'react'
import Hero from './Hero/Hero'
import Departments from './Departments/Departments'
import Deal from './Deal/Deal'
import PopularProducts from './PopularProducts/PopularProducts'
import SellerBanner from './SellerBanner/SellerBanner'

const Home = () => {
  return (
    <div className='max-w-[1600px] mx-auto pb-10'>
        <Hero/>
        <Departments/>
        <div className='pt-6'>
          <h2 className='font-display font-bold text-2xl mb-5 px-5 lg:px-20'>Deals this week</h2>
          <Deal/>
        </div>
        <PopularProducts/>
        <SellerBanner/>
    </div>
  )
}

export default Home