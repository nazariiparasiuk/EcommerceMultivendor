package com.store.request;

import com.store.domain.USER_ROLE;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String email;
    private String otp;
    private String newPassword;
    private USER_ROLE role;
}