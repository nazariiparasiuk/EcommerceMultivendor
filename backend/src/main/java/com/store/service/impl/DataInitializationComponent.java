package com.store.service.impl;

import com.store.domain.USER_ROLE;
import com.store.model.User;
import com.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    @Override
    public void run(String... args) {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUsername = "digitalhandovertest@gmail.com";

        if (userRepository.findByEmail(adminUsername)==null) {
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("codewithzosh"));
            adminUser.setFullName("Admin");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            userRepository.save(adminUser);
        }
    }

}
