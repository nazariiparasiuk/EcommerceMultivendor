package com.store.repository;

import com.store.model.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long sellerId);
}
