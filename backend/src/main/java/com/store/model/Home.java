package com.store.model;

import lombok.Data;

import java.util.List;

@Data
public class Home {

    private List<HomeCategory> grid;

    private List<HomeCategory> shopByCategories;

    private List<HomeCategory> electronics;

    private List<HomeCategory> dealCategories;

    private List<Deal> deals;
}
