package com.store.service;

import com.store.model.Cart;
import com.store.model.CartItem;
import com.store.model.Product;
import com.store.model.User;

public interface CartService {
    CartItem addCartItem(User user, Product product, String size, int quantity);
    Cart findUserCart(User user);
}
