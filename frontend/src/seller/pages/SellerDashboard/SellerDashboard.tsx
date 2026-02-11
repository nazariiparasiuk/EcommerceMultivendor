import React from 'react'
import SellerDrawerList from '../../components/SellerDrawerList/SellerDrawerList'
import SellerRoutes from '../../../Routes/SellerRoutes'

const SellerDashboard = () => {

    const toggleDrawer = () => {}
    return (
        <div className='lg:flex lg:h-[90vh]'>
            <section className='hidden lg:block h-full'>
                <SellerDrawerList toggleDrawer={toggleDrawer} />
            </section>
            <section className='p-10 w-full lg:w-[80%] pverflow-y-auto'>
                <SellerRoutes/>
            </section>
        </div>
    )
}

export default SellerDashboard