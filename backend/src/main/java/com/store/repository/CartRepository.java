package com.store.repository;

import com.store.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long id);
}
