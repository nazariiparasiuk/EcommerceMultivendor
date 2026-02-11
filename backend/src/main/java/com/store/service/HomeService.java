package com.store.service;

import com.store.model.Home;
import com.store.model.HomeCategory;

import java.util.List;

public interface HomeService {
    Home createHomePageData(List<HomeCategory> allCategories);
}
