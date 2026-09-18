import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../State/Store'

const CategorySheet = ({selectedCategory, setShowSheet}:any) => {
  const navigate = useNavigate();
  const { categories } = useAppSelector(store => store.categories);

  const levelTwo = categories.filter(
    (c) => c.level === 2 && c.parentCategory?.categoryId === selectedCategory
  );
  const levelThreeFor = (parentCategoryId: string) => categories.filter(
    (c) => c.level === 3 && c.parentCategory?.categoryId === parentCategoryId
  );

  return (
    <Box sx={
      {zIndex: 1}
    } className='bg-white shadow-lg lg:h-[500px] overflow-y-auto'>
      <div className='flex text-sm flex-wrap'>
        {
          levelTwo.map((item, index) =>
          <div className={`p-8 lg:w-[20%] ${index%2==0 ? "bg-slate-50":"bg-white"}`}>
            <p className='text-primary-color lg:mb-5 font-semibold'>{item.name}</p>
            <ul className='space-y-3'>

              {levelThreeFor(item.categoryId).map
              ((leaf)=> <div>
              <li onClick={()=>navigate("/products/"+leaf.categoryId)} className='hover:text-primary-color cursor-pointer'>
                {leaf.name}
              </li>
              </div>)}

            </ul>
          </div>)
        }
      </div>
    </Box>
  )
}

export default CategorySheet
