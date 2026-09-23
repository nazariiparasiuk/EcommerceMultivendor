import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme, Drawer, Divider } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { AddShoppingCart, FavoriteBorder, Storefront, Checkroom, DevicesOther, Weekend } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../State/Store';
import Logo from './Logo';

const departmentStyles: {[key:string]: {icon: React.ReactNode, hoverBg: string, hoverText: string}} = {
    clothing: { icon: <Checkroom sx={{fontSize:18}} className='text-rose'/>, hoverBg: 'hover:bg-rose/10', hoverText: 'hover:text-rose-ink' },
    electronics: { icon: <DevicesOther sx={{fontSize:18}} className='text-primary-color'/>, hoverBg: 'hover:bg-primary-color/10', hoverText: 'hover:text-primary-color' },
    home_goods: { icon: <Weekend sx={{fontSize:18}} className='text-amber-ink'/>, hoverBg: 'hover:bg-amber/20', hoverText: 'hover:text-amber-ink' },
};

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState("clothing");
    const [showCategorySheet, setShowCategorySheet] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    const navigate = useNavigate();
    const {auth, categories} = useAppSelector(store => store);
    const departments = categories.categories.filter((c) => c.level === 1);

    const goTo = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const goToWishlist = () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }
        navigate("/wishlist");
    };

    return (
        <Box className='sticky top-0 left-0 right-0 bg-white' sx={{zIndex:2}}>
            <div className='max-w-[1600px] mx-auto'>
                <div className='flex items-center gap-3 lg:gap-6 px-5 lg:px-20 h-[60px]'>
                    {!isLarge && (
                        <IconButton onClick={() => setMobileMenuOpen(true)}>
                            <MenuIcon/>
                        </IconButton>
                    )}
                    <div onClick={()=>navigate("/")} className='cursor-pointer shrink-0'>
                        <Logo compact={!isLarge}/>
                    </div>
                    <div className='flex-1 min-w-0 lg:max-w-[440px] flex items-center border border-gray-200 rounded-full px-4 bg-secondary-color/60'>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder='Search products...'
                            className='outline-none text-sm py-2 w-full min-w-0 bg-transparent'
                        />
                        <IconButton onClick={handleSearch} size='small'>
                            <SearchIcon className='text-primary-color'/>
                        </IconButton>
                    </div>
                    {isLarge && (
                        <div className='flex gap-1 lg:gap-4 items-center ml-auto shrink-0'>
                            {
                                auth.user ? <Button onClick={()=>navigate("/account/orders")} className='flex items-center gap-2'>
                                    <Avatar
                                    sx={{width: 29, height: 29}}
                                    src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
                                    <h1 className='font-semibold hidden lg:block'>
                                        {auth.user?.fullName}
                                    </h1>
                                </Button>:<Button onClick={() => navigate("/login")} variant='contained' className='!rounded-full !normal-case !px-5'>Login</Button>
                            }
                            <IconButton onClick={goToWishlist} className='hover:text-rose transition-colors'>
                                <FavoriteBorder className='text-gray-600' sx={{fontSize:26}} />
                            </IconButton>
                            <IconButton onClick={()=>navigate("/cart")} className='hover:text-primary-color transition-colors'>
                                <AddShoppingCart className='text-gray-600' sx={{fontSize:26}}/>
                            </IconButton>
                        </div>
                    )}
                    {!isLarge && (
                        <IconButton onClick={()=>navigate("/cart")} className='shrink-0'>
                            <AddShoppingCart className='text-gray-600' sx={{fontSize:26}}/>
                        </IconButton>
                    )}
                </div>

                {isLarge && (
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
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap text-gray-600 ${style.hoverBg} ${style.hoverText}`}>
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
                )}
            </div>

            <Drawer anchor='left' open={mobileMenuOpen} onClose={()=>setMobileMenuOpen(false)}>
                <div className='w-screen sm:w-72 p-5 flex flex-col gap-1'>
                    <div className='flex items-center justify-between mb-4'>
                        <Logo/>
                        <IconButton onClick={()=>setMobileMenuOpen(false)}><CloseIcon/></IconButton>
                    </div>

                    {auth.user ? (
                        <button onClick={()=>goTo("/account/orders")} className='flex items-center gap-3 py-3 text-left'>
                            <Avatar sx={{width:28,height:28}} src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'/>
                            <span className='font-semibold'>{auth.user?.fullName}</span>
                        </button>
                    ) : (
                        <Button onClick={()=>goTo("/login")} variant='contained' fullWidth className='!rounded-full !normal-case !mb-2'>Login</Button>
                    )}

                    <button onClick={()=>{ if(!auth.user){ goTo("/login"); return; } goTo("/wishlist"); }} className='flex items-center gap-3 py-3 text-gray-700 font-medium'>
                        <FavoriteBorder/> Wishlist
                    </button>
                    <button onClick={()=>goTo("/become-seller")} className='flex items-center gap-3 py-3 text-gray-700 font-medium'>
                        <Storefront/> Become a Seller
                    </button>

                    <Divider className='my-3'/>
                    <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1'>Departments</p>
                    {departments.map((item) => {
                        const style = departmentStyles[item.categoryId] || { icon: null, hoverBg: '', hoverText: '' };
                        return (
                            <button key={item.categoryId} onClick={()=>goTo(`/products/${item.categoryId}`)}
                                className='flex items-center gap-3 py-3 text-gray-700 font-medium'>
                                {style.icon}
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </Drawer>
        </Box>
    )
}

export default Navbar