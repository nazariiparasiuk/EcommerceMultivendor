package com.store.controller;

import com.store.model.Home;
import com.store.model.HomeCategory;
import com.store.request.HomeCategoryRequest;
import com.store.service.HomeCategoryService;
import com.store.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @GetMapping("/home")
    public ResponseEntity<Home> getHomePageData() {
        return ResponseEntity.ok(homeService.getHomePageData());
    }

    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategories() {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id, @RequestBody HomeCategoryRequest homeCategory) throws Exception {

        HomeCategory updatedCategory = homeCategoryService.updateCategory(homeCategory, id);
        return ResponseEntity.ok(updatedCategory);
    }
}