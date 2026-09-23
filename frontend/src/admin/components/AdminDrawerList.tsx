import React from 'react'
import DrawerList from '../../component/DrawerList'
import { AccountBox, Add, Dashboard, IntegrationInstructions, LocalOffer, Logout } from '@mui/icons-material';

const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <Dashboard className="text-primary-color" />,
        activeIcon: <Dashboard className="text-white" />,
    },
    {
        name: "Coupons",
        path: "/admin/coupon",
        icon: <IntegrationInstructions className="text-primary-color" />,
        activeIcon: <IntegrationInstructions className="text-white" />,
    },
    {
        name: "Add New Coupon",
        path: "/admin/add-coupon",
        icon: <Add className="text-primary-color" />,
        activeIcon: <Add className="text-white" />,
    },
    {
        name: "Deals",
        path: "/admin/deals",
        icon: <LocalOffer className="text-primary-color" />,
        activeIcon: <LocalOffer className="text-white" />,
    },
   
];

const menu2 = [

    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBox className="text-primary-color" />,
        activeIcon: <AccountBox className="text-white" />,
    },
    {
        name: "Logout",
        path: "/",
        icon: <Logout className="text-primary-color" />,
        activeIcon: <Logout className="text-white" />,
    },

]

const AdminDrawerList = ({toggleDrawer}:any) => {
  return (
    <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
  )
}

export default AdminDrawerList