package com.store.service.impl;

import com.store.model.Cart;
import com.store.model.Coupon;
import com.store.model.User;
import com.store.repository.CartRepository;
import com.store.repository.CouponRepository;
import com.store.repository.UserRepository;
import com.store.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());

        if(coupon == null) {
            throw new Exception("Coupon is not valid");
        }
        if(user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon already used");
        }
        if(orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("Coupon order value is less than the minimum order value" + coupon.getMinimumOrderValue());
        }
        if(coupon.isActive() && LocalDate.now().isAfter(coupon.getValidFrom()) && LocalDate.now().isBefore(coupon.getValidTo())) {
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);
            return cart;
        }
        throw new Exception("Coupon is not valid");
    }

    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);

        if(coupon == null) {
            throw new Exception("Coupon not found...");
        }

        Cart cart = cartRepository.findByUserId(user.getId());

        double discountedPrice = (cart.getTotalSellingPrice()*coupon.getDiscountPercentage())/100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);
        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(() -> new Exception("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
