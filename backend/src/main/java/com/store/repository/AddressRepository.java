package com.store.repository;

import com.store.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
