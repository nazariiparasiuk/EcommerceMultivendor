import React, { use, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserOrderHistory } from '../../../State/customer/orderSlice';
import OrderItem from './OrderItemCard';

const Order = () => {
  const dispatch = useAppDispatch();
  const {order} = useAppSelector(store => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")||""));
  }, []);
  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All Orders</h1>
        <p>from anytime</p>
      </div>
      <div className='space-y-2'>
        {order.orders.map((order)=> order.orderItems.map((item)=> <OrderItem item={item} order={order}/>))}
      </div>
    </div>
  )
}

export default Order