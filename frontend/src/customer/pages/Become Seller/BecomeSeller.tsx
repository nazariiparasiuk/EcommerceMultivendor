import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button } from '@mui/material';

const BecomeSeller = () => {
    const [isLogin, setIsLogin] = useState(false);
    const handleShowPage = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
            <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
                {!isLogin?<SellerAccountForm/>:<SellerLoginForm/>}

                <div className='mt-10 space-t-2'>
                    <h1 className='text-center text-sm font-medium'>Have account?</h1>
                    <Button fullWidth sx={{py:"11px"}} variant='outlined' onClick={handleShowPage}>
                        {isLogin?"Register":"Login"}
                    </Button>
                </div>
            </section>
            <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
                <div className='lg:w-[70%] px-5 space-y-10'>
                    <div className='space-y-2 font-bold text-center'>
                        <p className='text-2xl'>Join the Marketplace Revolution</p>
                        <p className='text-lg text-primary-color'>Boost your sales today!</p>
                    </div>
                    <img src="https://i.ibb.co/B5dttbmH/white-male-1834125-1920.jpg"/>
                </div>
            </section>
        </div>
    )
}

export default BecomeSeller