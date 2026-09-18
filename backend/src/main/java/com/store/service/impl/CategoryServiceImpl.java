package com.store.service.impl;

import com.store.model.Category;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductRepository;
import com.store.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Category createCategory(Category category) throws Exception {
        Category existing = categoryRepository.findByCategoryId(category.getCategoryId());
        if (existing != null) {
            throw new Exception("Category with this categoryId already exists");
        }

        Category parent = null;
        int level = 1;
        if (category.getParentCategory() != null) {
            parent = categoryRepository.findById(category.getParentCategory().getId())
                    .orElseThrow(() -> new Exception("Parent category not found"));
            level = parent.getLevel() + 1;
        }

        Category newCategory = new Category();
        newCategory.setName(category.getName());
        newCategory.setCategoryId(category.getCategoryId());
        newCategory.setLevel(level);
        newCategory.setParentCategory(parent);

        return categoryRepository.save(newCategory);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Category updateCategory(Long id, Category category) throws Exception {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if (category.getName() != null) {
            existing.setName(category.getName());
        }

        if (category.getParentCategory() != null) {
            Category newParent = categoryRepository.findById(category.getParentCategory().getId())
                    .orElseThrow(() -> new Exception("Parent category not found"));
            existing.setParentCategory(newParent);
            existing.setLevel(newParent.getLevel() + 1);
        }

        return categoryRepository.save(existing);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public void deleteCategory(Long id) throws Exception {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if (categoryRepository.existsByParentCategory(category)) {
            throw new Exception("Cannot delete a category that has child categories");
        }
        if (productRepository.existsByCategory(category)) {
            throw new Exception("Cannot delete a category that still has products");
        }

        categoryRepository.delete(category);
    }
}