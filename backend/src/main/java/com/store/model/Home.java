package com.store.model;

import lombok.Data;

import java.util.List;

@Data
public class Home {

    private List<HomeCategory> dealCategories;

    private List<Deal> deals;
}
