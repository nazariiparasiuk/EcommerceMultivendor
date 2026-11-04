package com.store.service.impl;

import com.store.domain.HomeCategorySection;
import com.store.model.Home;
import com.store.model.HomeCategory;
import com.store.repository.DealRepository;
import com.store.repository.HomeCategoryRepository;
import com.store.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final HomeCategoryRepository homeCategoryRepository;
    private final DealRepository dealRepository;

    @Override
    public Home getHomePageData() {
        List<HomeCategory> dealCategories = homeCategoryRepository.findAll().stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .toList();

        Home home = new Home();
        home.setDeals(dealRepository.findAll());
        home.setDealCategories(dealCategories);
        return home;
    }
}