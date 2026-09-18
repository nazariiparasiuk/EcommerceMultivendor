package com.store.service.impl;

import com.store.model.Category;
import com.store.model.HomeCategory;
import com.store.repository.CategoryRepository;
import com.store.repository.HomeCategoryRepository;
import com.store.request.HomeCategoryRequest;
import com.store.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<HomeCategory> createCategories(List<HomeCategoryRequest> homeCategories) throws Exception {
        if(homeCategoryRepository.findAll().isEmpty()) {
            List<HomeCategory> categories = new ArrayList<>();
            for(HomeCategoryRequest req : homeCategories) {
                Category category = categoryRepository.findByCategoryId(req.getCategory());
                if(category == null) {
                    throw new Exception("Category not found with categoryId " + req.getCategory());
                }
                HomeCategory homeCategory = new HomeCategory();
                homeCategory.setName(req.getName());
                homeCategory.setImage(req.getImage());
                homeCategory.setCategory(category);
                homeCategory.setSection(req.getSection());
                categories.add(homeCategory);
            }
            return homeCategoryRepository.saveAll(categories);
        }
        return homeCategoryRepository.findAll();
    }

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