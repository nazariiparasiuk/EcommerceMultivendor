package com.store.service;

import com.store.model.User;

public interface UserService {

    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
}
