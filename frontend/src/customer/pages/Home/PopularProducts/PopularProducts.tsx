import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../State/Store'
import { fetchPopularProducts } from '../../../../State/customer/ProductSlice'
import PopularProductCard from './PopularProductsCard'

const PopularProducts = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, []);

  return (
    <section className='px-5 lg:px-20 py-10'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='font-display font-bold text-2xl'>Popular right now</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {product.popularProducts.map((item) => <PopularProductCard key={item.id} item={item}/>)}
      </div>
    </section>
  )
}

export default PopularProducts