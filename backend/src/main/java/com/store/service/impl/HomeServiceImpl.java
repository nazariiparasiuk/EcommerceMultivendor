package com.store.service.impl;

import com.store.domain.HomeCategorySection;
import com.store.model.Deal;
import com.store.model.Home;
import com.store.model.HomeCategory;
import com.store.repository.DealRepository;
import com.store.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final DealRepository dealRepository;

    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {

        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.GRID)
                .toList();

        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .toList();

        List<HomeCategory> electronicCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.ELECTRONICS)
                .toList();

        List<HomeCategory> dealCategories = allCategories.stream()
                .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                .toList();

        List<Deal> createdDeals = new ArrayList<>();

        if(dealRepository.findAll().isEmpty()) {
            List<Deal> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> new Deal(null, 10, category))
                    .toList();
            createdDeals = dealRepository.saveAll(deals);
        } else createdDeals = dealRepository.findAll();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectronics(electronicCategories);
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
