import React, { useEffect } from 'react'
import ProductCard from '../Product/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { searchProduct } from '../../../State/customer/ProductSlice'

const SearchResults = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { product } = useAppSelector((store) => store);

  useEffect(() => {
    if (query) {
      dispatch(searchProduct(query));
    }
  }, [query]);

  return (
    <div className='mt-10 px-9'>
      <h1 className='text-2xl font-bold text-gray-700 pb-5'>
        Search results for "{query}"
      </h1>
      {product.searchProduct.length === 0 ? (
        <p className='text-gray-500'>No products found.</p>
      ) : (
        <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center'>
          {product.searchProduct.map((item) => <ProductCard key={item.id} item={item}/>)}
        </section>
      )}
    </div>
  )
}

export default SearchResults