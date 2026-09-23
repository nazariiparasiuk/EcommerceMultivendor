import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../State/Store'
import { Checkroom, DevicesOther, Weekend } from '@mui/icons-material'

const stallStyles: {[key:string]: {icon: React.ReactNode, bg: string, hoverBg: string, heading: string, pillText: string}} = {
    clothing: { icon: <Checkroom sx={{fontSize:34}} className='text-rose'/>, bg: 'bg-rose/10', hoverBg: 'hover:bg-rose/20', heading: 'text-rose-ink', pillText: 'text-rose-ink' },
    electronics: { icon: <DevicesOther sx={{fontSize:34}} className='text-primary-color'/>, bg: 'bg-primary-color/10', hoverBg: 'hover:bg-primary-color/20', heading: 'text-primary-color', pillText: 'text-primary-color' },
    home_goods: { icon: <Weekend sx={{fontSize:34}} className='text-amber-ink'/>, bg: 'bg-amber/20', hoverBg: 'hover:bg-amber/30', heading: 'text-amber-ink', pillText: 'text-amber-ink' },
};

const Departments = () => {
  const navigate = useNavigate();
  const { categories } = useAppSelector((store) => store.categories);
  const departments = categories.filter((c) => c.level === 1);
  const subCategoriesFor = (parentCategoryId: string) => categories.filter((c) => c.level === 2 && c.parentCategory?.categoryId === parentCategoryId);

  return (
    <section id='departments' className='px-5 lg:px-20 py-10'>
      <h2 className='font-display font-bold text-2xl mb-5'>Departments</h2>
      <div className='grid md:grid-cols-3 gap-4'>
        {departments.map((dept) => {
          const style = stallStyles[dept.categoryId] || { icon: null, bg: 'bg-gray-100', heading: 'text-gray-800', pillText: 'text-gray-800' };
          const subCategories = subCategoriesFor(dept.categoryId).slice(0, 2);
          return (
            <div key={dept.categoryId} onClick={()=>navigate(`/products/${dept.categoryId}`)}
              className={`rounded-2xl p-6 flex flex-col gap-4 border border-gray-200 cursor-pointer transition-colors ${style.bg} ${style.hoverBg}`}>
              {style.icon}
              <h3 className={`font-semibold text-lg ${style.heading}`}>{dept.name}</h3>
              <div className='flex flex-wrap gap-2'>
                {subCategories.map((sub) => (
                  <span key={sub.categoryId}
                    onClick={(e) => { e.stopPropagation(); navigate(`/products/${sub.categoryId}`); }}
                    className={`bg-white text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-50 transition-colors ${style.pillText}`}>
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default Departments