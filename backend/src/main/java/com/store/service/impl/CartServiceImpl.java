package com.store.service.impl;

import com.store.model.Cart;
import com.store.model.CartItem;
import com.store.model.Product;
import com.store.model.User;
import com.store.repository.CartItemRepository;
import com.store.repository.CartRepository;
import com.store.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {

        Cart cart = findUserCart(user);
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice = quantity*product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity*product.getMrpPrice());

            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);

        }
        return isPresent;
    }

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItems = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItems += cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItems(totalItems);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItems(totalItems);

        return cart;
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0) {
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}
