import { Divider } from '@mui/material'
import React from 'react'

const PricingCard = () => {
  return (
    <div>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span>$89</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span>$19</span>
        </div> 
        <div className='flex justify-between items-center'>
          <span>Shipping</span>
          <span>$6</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Plateform fee</span>
          <span>$4</span>
        </div>
        
      </div>

      <Divider/>

      <div className='flex justify-between items-center p-5 text-primary-color'>
          <span>Total</span>
          <span>$89</span>
      </div>
    </div>
  )
}

export default PricingCard