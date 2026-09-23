import React from 'react'
import { Button } from '@mui/material'
import { VerifiedUser, Lock, LocalShipping, Storefront } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const badges = [
  { icon: <VerifiedUser sx={{fontSize:19}}/>, label: 'Verified sellers', wrap: 'bg-primary-color/10 text-primary-color', iconWrap: 'bg-primary-color/20 text-primary-color' },
  { icon: <Lock sx={{fontSize:19}}/>, label: 'Secure payment', wrap: 'bg-rose/10 text-rose-ink', iconWrap: 'bg-rose/20 text-rose-ink' },
  { icon: <LocalShipping sx={{fontSize:19}}/>, label: 'Fast delivery', wrap: 'bg-amber/20 text-amber-ink', iconWrap: 'bg-amber/30 text-amber-ink' },
];

const Hero = () => {
  const navigate = useNavigate();
  const scrollToDepartments = () => {
    document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className='relative overflow-hidden px-5 lg:px-20 py-10 lg:py-14'>
      <div className='absolute -top-24 right-0 w-[420px] h-[420px] bg-primary-color/10 rounded-full blur-3xl pointer-events-none'/>
      <div className='absolute bottom-0 right-20 w-[320px] h-[320px] bg-rose/10 rounded-full blur-3xl pointer-events-none'/>
      <div className='relative grid lg:grid-cols-[1.3fr_1fr] gap-9 items-center'>
        <div>
          <h1 className='font-display font-bold text-3xl lg:text-5xl leading-tight tracking-tight'>
            Your <span className='text-primary-color'>way</span> to trusted sellers
          </h1>
          <p className='mt-4 text-gray-600 text-base lg:text-lg max-w-[46ch]'>
            Independent sellers, one storefront. From T-shirts to laptops to sofas — all in one cart.
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Button onClick={scrollToDepartments} variant='contained' size='large' className='!rounded-full !normal-case !font-bold !px-7 !py-3'>
              Start shopping →
            </Button>
            <Button onClick={()=>navigate("/become-seller")} startIcon={<Storefront/>} variant='outlined' size='large'
              className='!rounded-full !border-primary-color !text-primary-color hover:!bg-secondary-color !normal-case !font-bold !px-7 !py-3'>
              Become a seller
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          {badges.map((b) => (
            <div key={b.label} className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 font-semibold text-sm ${b.wrap}`}>
              <span className={`w-9 h-9 shrink-0 rounded-[11px] flex items-center justify-center ${b.iconWrap}`}>
                {b.icon}
              </span>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero