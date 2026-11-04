package com.store.service;

import com.store.model.HomeCategory;
import com.store.request.HomeCategoryRequest;

import java.util.List;

public interface HomeCategoryService {
    HomeCategory updateCategory(HomeCategoryRequest homeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}