import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddShoppingCart, FavoriteBorder, Storefront, Checkroom, DevicesOther, Weekend } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../State/Store';
import Logo from './Logo';

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState("clothing");
    const [showCategorySheet, setShowCategorySheet] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    const navigate = useNavigate();
    const {auth, categories} = useAppSelector(store => store);
    const departments = categories.categories.filter((c) => c.level === 1);
    const departmentStyles: {[key:string]: {icon: React.ReactNode, hoverBg: string, hoverText: string}} = {
        clothing: { icon: <Checkroom sx={{fontSize:18}} className='text-rose'/>, hoverBg: 'hover:bg-rose/10', hoverText: 'hover:text-rose-ink' },
        electronics: { icon: <DevicesOther sx={{fontSize:18}} className='text-primary-color'/>, hoverBg: 'hover:bg-primary-color/10', hoverText: 'hover:text-primary-color' },
        home_goods: { icon: <Weekend sx={{fontSize:18}} className='text-amber-ink'/>, hoverBg: 'hover:bg-amber/20', hoverText: 'hover:text-amber-ink' },
    };
    return (
        <Box className='sticky top-0 left-0 right-0 bg-white' sx={{zIndex:2}}>
            <div className='flex items-center gap-6 px-5 lg:px-20 h-[60px]'>
                <div className='flex items-center gap-2 shrink-0'>
                    {!isLarge && <IconButton>
                        <MenuIcon/>
                    </IconButton>}
                    <div onClick={()=>navigate("/")} className='cursor-pointer'>
                        <Logo/>
                    </div>
                </div>
                <div className='flex-1 max-w-[440px] flex items-center border border-gray-200 rounded-full px-4 bg-secondary-color/60'>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder='Search products...'
                        className='outline-none text-sm py-2 w-full bg-transparent'
                    />
                    <IconButton onClick={handleSearch} size='small'>
                        <SearchIcon className='text-primary-color'/>
                    </IconButton>
                </div>
                <div className='flex gap-1 lg:gap-6 items-center ml-auto shrink-0'>
                    {
                        auth.user ? <Button onClick={()=>navigate("/account/orders")} className='flex items-center gap-2'>
                            <Avatar
                            sx={{width: 29, height: 29}}
                            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
                            <h1 className='font-semibold hidden lg:block'>
                                {auth.user?.fullName}
                            </h1>
                        </Button>:<Button onClick={() => navigate("/login")} variant='contained'>Login</Button>
                    }
                    <IconButton onClick={() => navigate("/wishlist")} className='hover:text-rose transition-colors'>
                        <FavoriteBorder className='text-gray-600' sx={{fontSize:26}} />
                    </IconButton>
                    <IconButton onClick={()=>navigate("/cart")} className='hover:text-primary-color transition-colors'>
                        <AddShoppingCart className='text-gray-600' sx={{fontSize:26}}/>
                    </IconButton>

                    {isLarge && <Button onClick={()=>navigate("/become-seller")} startIcon={<Storefront/>}
                        className='!rounded-full !border-primary-color !text-primary-color hover:!bg-secondary-color' variant='outlined'>
                        Become Seller
                    </Button>}
                </div>
            </div>
            <div className='relative border-t border-b' onMouseLeave={()=>setShowCategorySheet(false)}>
                <div className='px-5 lg:px-20 py-1'>
                    <ul className='flex items-center gap-2'>
                        {departments.map((item) => {
                            const style = departmentStyles[item.categoryId] || { icon: null, hoverBg: 'hover:bg-gray-100', hoverText: 'hover:text-gray-900' };
                            return (
                            <li key={item.categoryId}
                            onMouseEnter={()=>{
                                setShowCategorySheet(true);
                                setSelectedCategory(item.categoryId);
                            }}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors text-gray-600 ${style.hoverBg} ${style.hoverText}`}>
                                {style.icon}
                                {item.name}
                            </li>
                            );
                        })}
                    </ul>
                </div>
                {showCategorySheet && <div
                className='absolute top-full left-20 border shadow-lg z-10'>
                    <CategorySheet selectedCategory={selectedCategory}/>
                </div>}
            </div>
        </Box>
    
  )
}

export default Navbar