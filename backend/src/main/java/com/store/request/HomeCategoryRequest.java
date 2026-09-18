package com.store.request;

import com.store.domain.HomeCategorySection;
import lombok.Data;

@Data
public class HomeCategoryRequest {
    private String name;
    private String image;
    private String category;
    private HomeCategorySection section;
}