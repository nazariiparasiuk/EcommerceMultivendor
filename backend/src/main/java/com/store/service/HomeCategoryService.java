package com.store.service;

import com.store.model.HomeCategory;

import java.util.List;

public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
    HomeCategory updateCategory(HomeCategory homeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}
