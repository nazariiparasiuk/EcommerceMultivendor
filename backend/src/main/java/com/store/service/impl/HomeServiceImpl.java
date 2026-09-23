package com.store.service.impl;

import com.store.domain.HomeCategorySection;
import com.store.model.Deal;
import com.store.model.Home;
import com.store.model.HomeCategory;
import com.store.model.Product;
import com.store.repository.DealRepository;
import com.store.repository.ProductRepository;
import com.store.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final DealRepository dealRepository;
    private final ProductRepository productRepository;

    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {

        List<HomeCategory> dealCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .toList();

        List<Deal> createdDeals = new ArrayList<>();

        if(dealRepository.findAll().isEmpty()) {
            List<Deal> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> {
                        int maxDiscount = productRepository.findByCategory(category.getCategory()).stream()
                                .mapToInt(Product::getDiscountPercent)
                                .max()
                                .orElse(0);
                        return new Deal(null, maxDiscount, category);
                    })
                    .toList();
            createdDeals = dealRepository.saveAll(deals);
        } else createdDeals = dealRepository.findAll();

        Home home = new Home();
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
