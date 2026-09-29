package com.store.service;

import com.store.domain.USER_ROLE;
import com.store.model.Seller;
import com.store.request.LoginRequest;
import com.store.request.ResetPasswordRequest;
import com.store.request.SellerSignupRequest;
import com.store.response.AuthResponse;
import com.store.response.SignupRequest;

public interface AuthService {

    void sendSignupCode(String email) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse authenticateUser(LoginRequest req) throws Exception;
    void sendPasswordResetCode(String email, USER_ROLE role) throws Exception;
    void resetPassword(ResetPasswordRequest req) throws Exception;
    void sendSellerSignupCode(String email) throws Exception;
    Seller createSeller(SellerSignupRequest req) throws Exception;

}