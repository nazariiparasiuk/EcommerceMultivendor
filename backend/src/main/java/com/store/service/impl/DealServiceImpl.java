package com.store.service.impl;

import com.store.model.Deal;
import com.store.model.HomeCategory;
import com.store.repository.DealRepository;
import com.store.repository.HomeCategoryRepository;
import com.store.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(category);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal exsitingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if(exsitingDeal != null) {
            if(deal.getDiscount() != null) {
                exsitingDeal.setDiscount(deal.getDiscount());
            }
            if(category != null) {
                exsitingDeal.setCategory(category);
            }
            return dealRepository.save(exsitingDeal);
        }
        throw new Exception("Deal not found");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(() ->
                new Exception("Deal not found"));
        dealRepository.delete(deal);
    }
}
