package com.store.repository;

import com.store.domain.OrderStatus;
import com.store.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("SELECT oi.product.id FROM OrderItem oi " +
            "WHERE oi.order.orderDate >= :since AND oi.order.orderStatus NOT IN :excludedStatuses " +
            "GROUP BY oi.product.id ORDER BY SUM(oi.quantity) DESC")
    List<Long> findBestSellingProductIds(@Param("since") LocalDateTime since,
                                         @Param("excludedStatuses") List<OrderStatus> excludedStatuses);
}