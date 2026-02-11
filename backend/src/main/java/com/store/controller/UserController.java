package com.store.controller;

import com.store.domain.USER_ROLE;
import com.store.model.User;
import com.store.response.AuthResponse;
import com.store.response.SignupRequest;
import com.store.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> userProfileHandler(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(user);
    }
}
