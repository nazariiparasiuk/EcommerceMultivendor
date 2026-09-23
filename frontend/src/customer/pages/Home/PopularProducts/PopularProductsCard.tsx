import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Snackbar, Alert } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Product } from '../../../../types/ProductTypes'
import { useAppDispatch, useAppSelector } from '../../../../State/Store'
import { addProductToWishlist } from '../../../../State/customer/wishlistSlice'

const PopularProductCard = ({item}:{item:Product}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, wishlist } = useAppSelector((store) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isWishlisted = wishlist.wishlist?.products?.some((p) => p.id === item.id);

  const handleWishlist = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!auth.user) {
      navigate('/login');
      return;
    }
    item.id && dispatch(addProductToWishlist({productId: item.id}));
    setSnackbarOpen(true);
  }

  return (
    <div onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}
      className='group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5'>
      <div className='relative aspect-square bg-gray-100 overflow-hidden'>
        <img src={item.images[0]} alt={item.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'/>
        <IconButton onClick={handleWishlist}
          className='!absolute !top-2 !right-2 !bg-white opacity-0 group-hover:opacity-100 transition-opacity !shadow-md'
          size='small'>
          {isWishlisted ? <Favorite className='text-rose' sx={{fontSize:18}}/> : <FavoriteBorder className='text-gray-600' sx={{fontSize:18}}/>}
        </IconButton>
      </div>
      <div className='p-4 space-y-1'>
        <p className='text-xs text-gray-400'>{item.seller?.businessDetails.businessName}</p>
        <p className='text-sm font-medium text-gray-800 truncate'>{item.title}</p>
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-1'>
          <span className='font-mono font-semibold text-gray-900 whitespace-nowrap'>$ {item.sellingPrice}</span>
          <span className='text-xs text-gray-400 line-through whitespace-nowrap'>$ {item.mrpPrice}</span>
          <span className='text-xs font-semibold text-primary-color whitespace-nowrap'>{item.discountPercent}%</span>
        </div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <Alert onClose={() => setSnackbarOpen(false)} severity='success' variant='filled'>
          Added to wishlist
        </Alert>
      </Snackbar>
    </div>
  )
}

export default PopularProductCard