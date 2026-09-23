import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const SellerBanner = () => {
  const navigate = useNavigate();
  return (
    <section className='px-5 lg:px-20 py-10'>
      <div className='relative overflow-hidden rounded-2xl px-8 py-12 lg:px-14 lg:py-16 flex flex-col items-start gap-4 text-white'
        style={{background: 'linear-gradient(135deg, #4F46E5, #3730A3)'}}>
        <svg className='absolute -right-10 -bottom-16 w-72 h-72 opacity-10 pointer-events-none' viewBox="0 0 200 200" fill="none">
          <path d="M20 20 L70 70 L20 120" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M85 20 L135 70 L85 120" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M60 90 L110 140 L60 190" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M125 90 L175 140 L125 190" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className='font-display font-bold text-2xl lg:text-4xl max-w-[22ch] leading-tight'>Sell your products with Sellway</h2>
        <p className='text-white/85 max-w-[46ch]'>Join independent sellers and reach customers across every category — from fashion to electronics to home goods.</p>
        <Button onClick={()=>navigate('/become-seller')} startIcon={<Storefront/>} variant='contained' size='large'
          className='!bg-amber !text-amber-ink !rounded-full !normal-case !font-bold !px-7 !py-3 hover:!brightness-105'>
          Become a Seller
        </Button>
      </div>
    </section>
  )
}

export default SellerBanner