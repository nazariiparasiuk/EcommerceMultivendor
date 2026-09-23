import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Deal } from '../../../../types/dealTypes'

const DealCard = ({item}:{item:Deal}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/products/${item.category.categoryId}`)}
      className="group min-w-[220px] sm:min-w-0 bg-white border border-gray-200 rounded-2xl px-5 py-5 flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
      <span className="inline-flex items-baseline gap-1.5 bg-rose/10 text-rose-ink font-bold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
        <span className="text-xs font-medium">Up to</span>
        <span className="font-mono text-lg">{item.discount}%</span>
        <span className="text-xs font-medium">off</span>
      </span>
      <span className="text-sm font-medium text-gray-600 text-right max-w-[16ch] group-hover:text-primary-color transition-colors">
        {item.category.name}
      </span>
    </div>
  )
}

export default DealCard