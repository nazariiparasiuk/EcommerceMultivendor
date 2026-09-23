package com.store.service;

import com.store.model.HomeCategory;
import com.store.request.HomeCategoryRequest;

import java.util.List;

public interface HomeCategoryService {
    List<HomeCategory> createCategories(List<HomeCategoryRequest> homeCategories) throws Exception;
    HomeCategory updateCategory(HomeCategoryRequest homeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}