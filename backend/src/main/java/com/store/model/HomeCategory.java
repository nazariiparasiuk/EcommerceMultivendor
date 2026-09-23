package com.store.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.store.domain.HomeCategorySection;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class HomeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String image;

    @ManyToOne
    @JsonIgnore
    private Category category;

    public String getCategoryId() {
        return category != null ? category.getCategoryId() : null;
    }
    private HomeCategorySection section;
}
