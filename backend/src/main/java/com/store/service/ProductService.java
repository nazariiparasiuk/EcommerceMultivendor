package com.store.service;

import com.store.exception.ProductException;
import com.store.model.Product;
import com.store.model.Seller;
import com.store.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest req, Seller seller);
    void deleteProduct(Long productId) throws ProductException;
    Product updateProduct(Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProducts(String query) throws ProductException;
    Page<Product> getAllProducts(String category, String brand,
                                 String colors, String size,
                                 Integer minPrice, Integer maxPrice,
                                 Integer minDiscount, String sort,
                                 String stock, Integer pageNumber
                                 );
    List<Product> getProductBySellerId(Long sellerId);
}
