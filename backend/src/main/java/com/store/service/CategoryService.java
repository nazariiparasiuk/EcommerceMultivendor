package com.store.service;

import com.store.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category createCategory(Category category) throws Exception;
    Category updateCategory(Long id, Category category) throws Exception;
    void deleteCategory(Long id) throws Exception;
}