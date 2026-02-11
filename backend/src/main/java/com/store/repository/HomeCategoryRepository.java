package com.store.repository;

import com.store.model.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {

}
