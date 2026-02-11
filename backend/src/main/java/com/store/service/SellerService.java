package com.store.service;

import com.store.domain.AccountStatus;
import com.store.exception.SellerException;
import com.store.model.Seller;

import java.util.List;

public interface SellerService {

    Seller getSellerProfile(String jwt) throws SellerException;
    Seller createSeller(Seller seller) throws Exception;
    Seller getSellerById(Long id) throws SellerException;
    Seller getSellerByEmail(String email) throws SellerException;
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long id, Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    Seller verifyEmail(String email, String otp) throws Exception;
    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;

}
