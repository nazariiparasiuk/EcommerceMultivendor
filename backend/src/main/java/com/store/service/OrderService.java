package com.store.service;

import com.store.domain.OrderStatus;
import com.store.model.*;

import java.util.List;
import java.util.Set;

public interface OrderService {
    Set<Order> createOrder(User user, Address address, Cart cart);
    Order findOrderById(Long id) throws Exception;
    List<Order> usersOrderHistory(Long userId);
    List<Order> sellersOrder(Long sellerId);
    Order updateOrderStatus(Long id, OrderStatus status) throws Exception;
    Order cancelOrder(Long orderId, User user) throws Exception;
    OrderItem getOrderItemById(Long id) throws Exception;
}
