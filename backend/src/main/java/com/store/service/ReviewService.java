package com.store.service;

import com.store.model.Product;
import com.store.model.Review;
import com.store.model.User;
import com.store.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product);
    List<Review> getReviewByProductId(Long productId);

    Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;

    Review getReviewById(Long reviewId) throws Exception;
}
