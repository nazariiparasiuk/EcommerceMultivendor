package com.store.repository;

import com.store.model.Cart;
import com.store.model.CartItem;
import com.store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
