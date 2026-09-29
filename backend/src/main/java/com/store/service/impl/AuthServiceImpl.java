package com.store.service.impl;

import com.store.config.JwtProvider;
import com.store.domain.USER_ROLE;
import com.store.exception.AuthException;
import com.store.model.*;
import com.store.repository.*;
import com.store.request.LoginRequest;
import com.store.request.ResetPasswordRequest;
import com.store.request.SellerSignupRequest;
import com.store.response.AuthResponse;
import com.store.response.SignupRequest;
import com.store.service.AuthService;
import com.store.service.EmailService;
import com.store.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final int MIN_PASSWORD_LENGTH = 8;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepository sellerRepository;
    private final AddressRepository addressRepository;

    @Value("${app.auth.log-codes:false}")
    private boolean logCodes;

    @Override
    public void sendSignupCode(String email) throws Exception {
        if (userRepository.findByEmail(email) != null) {
            throw emailTaken();
        }
        sendCode(email, "Confirm your Sellway account", "Your Sellway verification code is: ");
    }

    @Override
    public String createUser(SignupRequest req) throws Exception {
        if (userRepository.findByEmail(req.getEmail()) != null) {
            throw emailTaken();
        }
        validatePassword(req.getPassword());
        consumeCode(req.getEmail(), req.getOtp());

        User user = new User();
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setRole(USER_ROLE.ROLE_CUSTOMER);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user.getEmail(), null, List.of(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString())));
        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse authenticateUser(LoginRequest req) throws Exception {
        UserDetails userDetails;
        try {
            userDetails = customUserService.loadUserByUsername(req.getEmail());
        } catch (UsernameNotFoundException e) {
            throw invalidCredentials();
        }
        if (req.getPassword() == null || !passwordEncoder.matches(req.getPassword(), userDetails.getPassword())) {
            throw invalidCredentials();
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwtProvider.generateToken(authentication));
        authResponse.setMessage("Login successful");
        String roleName = userDetails.getAuthorities().iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    @Override
    public void sendPasswordResetCode(String email, USER_ROLE role) throws Exception {
        boolean accountExists = role == USER_ROLE.ROLE_SELLER
                ? sellerRepository.findByEmail(email) != null
                : userRepository.findByEmail(email) != null;
        // Silent when there is no account, so the endpoint can't be used to discover registered emails.
        if (accountExists) {
            sendCode(email, "Reset your Sellway password", "Your Sellway password reset code is: ");
        }
    }

    @Override
    public void resetPassword(ResetPasswordRequest req) throws Exception {
        validatePassword(req.getNewPassword());
        consumeCode(req.getEmail(), req.getOtp());
        String encodedPassword = passwordEncoder.encode(req.getNewPassword());

        if (req.getRole() == USER_ROLE.ROLE_SELLER) {
            Seller seller = sellerRepository.findByEmail(req.getEmail());
            if (seller == null) throw invalidCode();
            seller.setPassword(encodedPassword);
            sellerRepository.save(seller);
        } else {
            User user = userRepository.findByEmail(req.getEmail());
            if (user == null) throw invalidCode();
            user.setPassword(encodedPassword);
            userRepository.save(user);
        }
    }

    @Override
    public void sendSellerSignupCode(String email) throws Exception {
        if (sellerRepository.findByEmail(email) != null) {
            throw sellerEmailTaken();
        }
        sendCode(email, "Confirm your Sellway seller account", "Your Sellway seller verification code is: ");
    }

    @Override
    public Seller createSeller(SellerSignupRequest req) throws Exception {
        if (sellerRepository.findByEmail(req.getEmail()) != null) {
            throw sellerEmailTaken();
        }
        validatePassword(req.getPassword());
        consumeCode(req.getEmail(), req.getOtp());

        Address pickupAddress = req.getPickupAddress();
        pickupAddress.setId(null);

        Seller seller = new Seller();
        seller.setEmail(req.getEmail());
        seller.setPassword(passwordEncoder.encode(req.getPassword()));
        seller.setSellerName(req.getSellerName());
        seller.setMobile(req.getMobile());
        seller.setGSTIN(req.getTaxId());
        seller.setBusinessDetails(req.getBusinessDetails());
        seller.setBankDetails(req.getBankDetails());
        seller.setPickupAddress(addressRepository.save(pickupAddress));
        seller.setRole(USER_ROLE.ROLE_SELLER);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    private void sendCode(String email, String subject, String textPrefix) {
        VerificationCode existing = verificationCodeRepository.findByEmail(email);
        if (existing != null) {
            verificationCodeRepository.delete(existing);
        }

        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        if (logCodes) {
            log.info("Verification code for {}: {}", email, otp);
            try {
                emailService.sendVerificationEmail(email, otp, subject, textPrefix + otp);
            } catch (Exception e) {
                log.warn("Email to {} not sent ({}); use the logged code", email, e.getMessage());
            }
            return;
        }
        try {
            emailService.sendVerificationEmail(email, otp, subject, textPrefix + otp);
        } catch (MailException e) {
            throw e;
        } catch (Exception e) {
            throw new org.springframework.mail.MailSendException("Failed to send mail", e);
        }
    }

    private void consumeCode(String email, String otp) throws AuthException {
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw invalidCode();
        }
        verificationCodeRepository.delete(verificationCode);
    }

    private void validatePassword(String password) throws AuthException {
        if (password == null || password.length() < MIN_PASSWORD_LENGTH) {
            throw new AuthException("Password must be at least " + MIN_PASSWORD_LENGTH + " characters.", HttpStatus.BAD_REQUEST);
        }
    }

    private AuthException invalidCredentials() {
        return new AuthException("That email and password don't match. Check them and try again.", HttpStatus.UNAUTHORIZED);
    }

    private AuthException invalidCode() {
        return new AuthException("That code is incorrect or has expired. Request a new one.", HttpStatus.BAD_REQUEST);
    }

    private AuthException emailTaken() {
        return new AuthException("An account with this email already exists. Sign in instead.", HttpStatus.CONFLICT);
    }

    private AuthException sellerEmailTaken() {
        return new AuthException("A store with this email already exists. Sign in instead.", HttpStatus.CONFLICT);
    }
}