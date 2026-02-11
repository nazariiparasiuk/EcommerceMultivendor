package com.store.controller;

import com.store.config.JwtProvider;
import com.store.domain.AccountStatus;
import com.store.exception.SellerException;
import com.store.model.Seller;
import com.store.model.SellerReport;
import com.store.model.VerificationCode;
import com.store.repository.VerificationCodeRepository;
import com.store.request.LoginRequest;
import com.store.response.ApiResponse;
import com.store.response.AuthResponse;
import com.store.service.AuthService;
import com.store.service.EmailService;
import com.store.service.SellerReportService;
import com.store.service.SellerService;
import com.store.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {
        String otp = req.getOtp();
        String email = req.getEmail();

        

        req.setEmail("seller_" + email);
        AuthResponse authResponse = authService.authenticateUser(req);

        return ResponseEntity.ok(authResponse);
    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if(verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Wrong otp");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {

        Seller savedSeller = sellerService.createSeller(seller);

        String otp = OtpUtil.generateOtp();
//        VerificationCode verificationCode = verificationService.createVerificationCode(otp, seller.getEmail());

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(seller.getEmail());
        verificationCodeRepository.save(verificationCode);


        String subject = "Ecommerce Multivendor Email Verification Code";
        String text = "Welcome to Ecommerce Multivendor. Verify your account using this link ";
        String frontend_url = "http://localhost:3000/verify-seller/";
        emailService.sendVerificationEmail(seller.getEmail(), verificationCode.getOtp(), subject, text + frontend_url);
        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws SellerException {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status) {

        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping()
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Seller> deleteSeller(@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
