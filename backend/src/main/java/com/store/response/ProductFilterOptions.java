package com.store.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterOptions {
    private List<String> colors;
    private Integer minPrice;
    private Integer maxPrice;
}