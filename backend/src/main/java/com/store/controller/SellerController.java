package com.store.controller;

import com.store.config.JwtProvider;
import com.store.domain.AccountStatus;
import com.store.exception.SellerException;
import com.store.model.Seller;
import com.store.model.SellerReport;
import com.store.request.LoginOtpRequest;
import com.store.request.LoginRequest;
import com.store.request.SellerSignupRequest;
import com.store.response.ApiResponse;
import com.store.response.AuthResponse;
import com.store.response.SellerResponse;
import com.store.service.AuthService;
import com.store.service.SellerReportService;
import com.store.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {

        req.setEmail("seller_" + req.getEmail());
        AuthResponse authResponse = authService.authenticateUser(req);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/signup/code")
    public ResponseEntity<ApiResponse> sendSignupCode(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sendSellerSignupCode(req.getEmail());
        ApiResponse res = new ApiResponse();
        res.setMessage("We sent a 6-digit code to " + req.getEmail() + ".");
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<SellerResponse> createSeller(@RequestBody SellerSignupRequest req) throws Exception {
        Seller seller = authService.createSeller(req);
        return new ResponseEntity<>(SellerResponse.fromSeller(seller), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerResponse> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(SellerResponse.fromSeller(seller), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<SellerResponse> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(SellerResponse.fromSeller(seller), HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws SellerException {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<SellerResponse>> getAllSellers(@RequestParam(required = false) AccountStatus status) {

        List<Seller> sellers = sellerService.getAllSellers(status);
        List<SellerResponse> response = sellers.stream()
                .map(SellerResponse::fromSeller)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PatchMapping()
    public ResponseEntity<SellerResponse> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(SellerResponse.fromSeller(updatedSeller));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Seller> deleteSeller(@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
