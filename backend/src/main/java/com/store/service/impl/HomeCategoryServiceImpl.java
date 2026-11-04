package com.store.service.impl;

import com.store.model.Category;
import com.store.model.HomeCategory;
import com.store.repository.CategoryRepository;
import com.store.repository.HomeCategoryRepository;
import com.store.request.HomeCategoryRequest;
import com.store.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public HomeCategory updateCategory(HomeCategoryRequest category, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if(category.getImage() != null) {
            existingCategory.setImage(category.getImage());
        }
        if(category.getCategory() != null) {
            Category newCategory = categoryRepository.findByCategoryId(category.getCategory());
            if(newCategory == null) {
                throw new Exception("Category not found with categoryId " + category.getCategory());
            }
            existingCategory.setCategory(newCategory);
        }
        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}