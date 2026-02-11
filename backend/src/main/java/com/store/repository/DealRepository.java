package com.store.repository;

import com.store.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {
}
