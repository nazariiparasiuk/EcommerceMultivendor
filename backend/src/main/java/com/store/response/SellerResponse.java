package com.store.response;

import com.store.domain.AccountStatus;
import com.store.domain.USER_ROLE;
import com.store.model.Address;
import com.store.model.BusinessDetails;
import com.store.model.Seller;
import lombok.Data;

@Data
public class SellerResponse {

    private Long id;
    private String sellerName;
    private String mobile;
    private String email;
    private BusinessDetails businessDetails;
    private Address pickupAddress;
    private String GSTIN;
    private USER_ROLE role;
    private boolean isEmailVerified;
    private AccountStatus accountStatus;

    public static SellerResponse fromSeller(Seller seller) {
        SellerResponse response = new SellerResponse();
        response.setId(seller.getId());
        response.setSellerName(seller.getSellerName());
        response.setMobile(seller.getMobile());
        response.setEmail(seller.getEmail());
        response.setBusinessDetails(seller.getBusinessDetails());
        response.setPickupAddress(seller.getPickupAddress());
        response.setGSTIN(seller.getGSTIN());
        response.setRole(seller.getRole());
        response.setEmailVerified(seller.isEmailVerified());
        response.setAccountStatus(seller.getAccountStatus());
        return response;
    }
}