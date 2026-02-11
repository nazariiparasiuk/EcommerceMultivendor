package com.store.service;

import com.store.domain.USER_ROLE;
import com.store.request.LoginRequest;
import com.store.response.AuthResponse;
import com.store.response.SignupRequest;

public interface AuthService {

    void sendLoginOtp(String email, USER_ROLE role) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse authenticateUser(LoginRequest req) throws Exception;

}
