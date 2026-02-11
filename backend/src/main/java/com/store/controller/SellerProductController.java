package com.store.controller;

import com.store.exception.ProductException;
import com.store.exception.SellerException;
import com.store.model.Product;
import com.store.model.Seller;
import com.store.request.CreateProductRequest;
import com.store.service.ProductService;
import com.store.service.SellerService;
import com.store.service.UserService;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers/products")
public class SellerProductController {

    private final ProductService productService;
    private final SellerService sellerService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<Product>> getProductBySellerId(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);

        List<Product> products = productService.getProductBySellerId(seller.getId());
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        Seller seller = sellerService.getSellerProfile(jwt);
        Product product = productService.createProduct(request, seller);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) throws ProductException {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) throws ProductException {
        Product updatedProduct = productService.updateProduct(productId, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
