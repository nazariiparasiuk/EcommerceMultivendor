package com.store.controller;

import com.store.domain.USER_ROLE;
import com.store.request.LoginOtpRequest;
import com.store.request.LoginRequest;
import com.store.request.ResetPasswordRequest;
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

    private final AuthService authService;

    @PostMapping("/signup/code")
    public ResponseEntity<ApiResponse> sendSignupCode(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sendSignupCode(req.getEmail());
        return ResponseEntity.ok(message("We sent a 6-digit code to " + req.getEmail() + "."));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest req) throws Exception {
        AuthResponse res = new AuthResponse();
        res.setJwt(authService.createUser(req));
        res.setMessage("Account created");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) throws Exception {
        return ResponseEntity.ok(authService.authenticateUser(req));
    }

    @PostMapping("/password/forgot")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sendPasswordResetCode(req.getEmail(), req.getRole());
        return ResponseEntity.ok(message("If an account exists for " + req.getEmail() + ", we sent a code to reset the password."));
    }

    @PostMapping("/password/reset")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody ResetPasswordRequest req) throws Exception {
        authService.resetPassword(req);
        return ResponseEntity.ok(message("Password updated. You can sign in now."));
    }

    private ApiResponse message(String text) {
        ApiResponse res = new ApiResponse();
        res.setMessage(text);
        return res;
    }
}