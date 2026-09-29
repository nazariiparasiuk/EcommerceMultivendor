import React from 'react'
import { Link } from 'react-router-dom'
import { VerifiedUser, Lock, LocalShipping, Inventory2, BarChart, AccountBalanceWallet, ArrowBack } from '@mui/icons-material'
import Logo from '../../components/Navbar/Logo'

const panels = {
  buyer: {
    background: 'bg-primary-color',
    title: 'Your way to trusted sellers',
    text: 'Independent sellers, one storefront. From T-shirts to laptops to sofas, all in one cart.',
    points: [
      { icon: <VerifiedUser className='text-amber'/>, label: 'Verified sellers' },
      { icon: <Lock className='text-amber'/>, label: 'Secure payment' },
      { icon: <LocalShipping className='text-amber'/>, label: 'Fast delivery' },
    ],
  },
  seller: {
    background: 'bg-[#1E1B4B]',
    title: 'Sell your products with Sellway',
    text: 'Join independent sellers and reach customers across every category, from fashion to electronics to home goods.',
    points: [
      { icon: <Inventory2 className='text-amber'/>, label: 'List products in minutes' },
      { icon: <BarChart className='text-amber'/>, label: 'Track orders and sales in one dashboard' },
      { icon: <AccountBalanceWallet className='text-amber'/>, label: 'Get paid straight to your bank account' },
    ],
  },
};

interface AuthLayoutProps {
  variant?: 'buyer' | 'seller';
  panelTitle?: string;
  wide?: boolean;
  children: React.ReactNode;
}

const AuthLayout = ({ variant = 'buyer', panelTitle, wide = false, children }: AuthLayoutProps) => {
  const panel = panels[variant];
  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-[#FAFAFC]'>
      <aside className={`relative overflow-hidden text-white px-6 py-8 lg:p-14 lg:w-[520px] 2xl:p-20 2xl:w-[40%] 2xl:max-w-[960px] lg:shrink-0 flex flex-col gap-6 lg:justify-between ${panel.background}`}>
        <Link to='/' aria-label='Sellway home' className='flex items-center gap-3 w-fit'>
          <Logo light/>
          {variant === 'seller' && (
            <span className='text-xs font-bold uppercase tracking-wider text-[#1E1B4B] bg-amber px-2.5 py-1 rounded-full'>Seller</span>
          )}
        </Link>
        <div className='relative flex flex-col gap-5'>
          <h2 className='font-display font-bold text-2xl lg:text-[40px] lg:leading-[1.1] 2xl:text-[56px] tracking-tight'>{panelTitle ?? panel.title}</h2>
          <p className='hidden lg:block text-base 2xl:text-lg leading-relaxed text-white/80 max-w-[38ch]'>{panel.text}</p>
          <ul className='hidden lg:flex flex-col gap-3.5 mt-3 font-semibold'>
            {panel.points.map((point) => (
              <li key={point.label} className='flex items-center gap-3'>{point.icon}{point.label}</li>
            ))}
          </ul>
        </div>
        <svg viewBox='0 0 19 16' fill='none' aria-hidden='true' className='absolute -right-28 -bottom-20 w-[420px] opacity-10 pointer-events-none'>
          <path d='M2 2 L8 8 L2 14' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'/>
          <path d='M11 2 L17 8 L11 14' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
        <p className='hidden lg:block relative text-sm text-white/60'>© 2026 Sellway</p>
      </aside>

      <main className='flex-1 flex items-start lg:items-center justify-center px-6 py-10'>
        <div className={`w-full ${wide ? 'max-w-[620px] 2xl:max-w-[720px]' : 'max-w-[420px] 2xl:max-w-[480px]'} flex flex-col gap-6`}>
          <Link to='/' className='inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-primary-color w-fit'>
            <ArrowBack sx={{ fontSize: 18 }}/> Back to store
          </Link>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout