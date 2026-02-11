package com.store.service.impl;

import com.store.model.Product;
import com.store.model.User;
import com.store.model.Wishlist;
import com.store.repository.WishlistRepository;
import com.store.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishlistByUser(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = createWishlist(user);
        }
        return wishlist;
    }

    @Override
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist = getWishlistByUser(user);
        if(wishlist.getProducts().contains(product)) {
            wishlist.getProducts().remove(product);
        } else {
            wishlist.getProducts().add(product);
        }
        return wishlistRepository.save(wishlist);
    }
}
