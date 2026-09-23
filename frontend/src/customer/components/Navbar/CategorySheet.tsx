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

  const accentStyles: {[key:string]: {heading: string, hoverText: string}} = {
    clothing: { heading: 'text-rose-ink', hoverText: 'hover:text-rose-ink' },
    electronics: { heading: 'text-primary-color', hoverText: 'hover:text-primary-color' },
    home_goods: { heading: 'text-amber-ink', hoverText: 'hover:text-amber-ink' },
  };
  const accent = accentStyles[selectedCategory] || { heading: 'text-primary-color', hoverText: 'hover:text-primary-color' };

  return (
    <Box sx={
      {zIndex: 1}
    } className='bg-white shadow-lg max-h-[500px] overflow-y-auto'>
      <div className='flex text-sm flex-wrap'>
        {
          levelTwo.map((item, index) =>
          <div key={item.categoryId} className={`p-8 lg:w-56 ${index%2==0 ? "bg-slate-50":"bg-white"}`}>
            <p className={`${accent.heading} lg:mb-5 font-semibold`}>{item.name}</p>
            <ul className='space-y-3'>

              {levelThreeFor(item.categoryId).map
              ((leaf)=> <div key={leaf.categoryId}>
              <li onClick={()=>navigate("/products/"+leaf.categoryId)} className={`${accent.hoverText} cursor-pointer`}>
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
