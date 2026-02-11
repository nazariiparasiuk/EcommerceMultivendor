package com.store.service;

import com.store.model.Product;
import com.store.model.User;
import com.store.model.Wishlist;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUser(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
