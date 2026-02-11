package com.store.controller;

import com.store.domain.USER_ROLE;
import com.store.model.VerificationCode;
import com.store.repository.UserRepository;
import com.store.request.LoginOtpRequest;
import com.store.request.LoginRequest;
import com.store.response.ApiResponse;
import com.store.response.AuthResponse;
import com.store.response.SignupRequest;
import com.store.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        String jwt = authService.createUser(req);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("User created successfully");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {

        authService.sendLoginOtp(req.getEmail(), req.getRole());

        ApiResponse res = new ApiResponse();

        res.setMessage("Otp sent successfully");


        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {

        AuthResponse authResponse = authService.authenticateUser(req);

        return ResponseEntity.ok(authResponse);
    }
}
