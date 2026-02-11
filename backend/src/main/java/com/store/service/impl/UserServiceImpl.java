package com.store.service.impl;

import com.store.config.JwtProvider;
import com.store.model.User;
import com.store.repository.UserRepository;
import com.store.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        System.out.println("EMAIL FROM JWT = [" + email + "]");

        return this.findUserByEmail(email);

    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User was not found with email: " + email);
        }
        return user;
    }
}
