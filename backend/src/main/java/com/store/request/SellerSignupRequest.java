package com.store.request;

import com.store.model.Address;
import com.store.model.BankDetails;
import com.store.model.BusinessDetails;
import lombok.Data;

@Data
public class SellerSignupRequest {
    private String email;
    private String password;
    private String otp;
    private String sellerName;
    private String mobile;
    private String taxId;
    private BusinessDetails businessDetails;
    private Address pickupAddress;
    private BankDetails bankDetails;
}
