import React from 'react'
import ElectronicsCategory from './ElectronicsCategory/ElectronicsCategory'
import CategoryGrid from './CaregoryGrid/CategoryGrid'
import Deal from './Deal/Deal'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
  return (
    <div className='space-y-5 lg:space-y-10 relative pb-20'>
        <ElectronicsCategory/>
        <CategoryGrid/>
        
        <div className='pt-20'>
          <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center'>TODAY'S DEALS</h1>
          <Deal/>
        </div>
        <section className='py-20'>
          <h1 className='text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center'>SHOP BY CATEGORY</h1>
          <ShopByCategory/>
        </section>
        <section className="relative w-full h-[200px] lg:h-[450px] flex justify-center items-center">
          <div className="relative h-full">
            <img className="h-full object-cover" src="https://i.imgur.com/aXMtXlI.png" alt="" />

            <div className="absolute inset-0 flex flex-col items-start pt-10 lg:pt-16 pl-10 lg:pl-32 font-semibold lg:text-4xl space-y-4">
              <div className='lg:pl-[5%]'>
                <h1>Sell your Product</h1>
                <p className="text-lg md:text-2xl">
                  With <span className="logo">Online Store</span>
                </p>
              </div>
              <div className='lg:pl-[7%] lg:pt-[6%] flex justify-center'>
                <Button startIcon={<Storefront/>} variant='contained' size='large'>
                  Become Seller
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
// https://i.imgur.com/pu7Wf1i.png
export default Home