package com.store.controller;

import com.store.exception.ProductException;
import com.store.model.Product;
import com.store.model.User;
import com.store.model.Wishlist;
import com.store.service.ProductService;
import com.store.service.UserService;
import com.store.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {

    private final WishlistService wishlistService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Wishlist> getWishlistByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Wishlist wishlist = wishlistService.getWishlistByUser(user);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add-product/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        Wishlist updatedWishlist = wishlistService.addProductToWishlist(user, product);
        return ResponseEntity.ok(updatedWishlist);
    }
}
