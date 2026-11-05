package com.store.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Products and reviews are served to anonymous visitors, so the seller and the
 * review author they embed must only expose public identity, never contact,
 * address or bank data.
 */
class PublicJsonExposureTest {

    private final ObjectMapper mapper = JsonMapper.builder().findAndAddModules().build();

    @Test
    void productExposesOnlyTheSellersStorefrontIdentity() {
        Seller seller = new Seller();
        seller.setId(7L);
        seller.setSellerName("Jane Owner");
        seller.setEmail("owner@example.com");
        seller.setMobile("+380501112233");
        seller.setGSTIN("GSTIN-0001");
        seller.setPassword("bcrypt-hash");
        seller.getBusinessDetails().setBusinessName("Maple & Muse");
        seller.getBankDetails().setAccountNumber("UA213223130000026007233566001");
        seller.getBankDetails().setIfscCode("IFSC0001");
        seller.getPickupAddress().setAddress("1 Warehouse Street");

        Product product = new Product();
        product.setTitle("Structured Leather Bag");
        product.setSeller(seller);

        JsonNode sellerJson = mapper.valueToTree(product).get("seller");

        assertThat(fieldNames(sellerJson)).containsExactlyInAnyOrder("id", "businessDetails");
        assertThat(sellerJson.get("id").asLong()).isEqualTo(7L);
        assertThat(sellerJson.get("businessDetails").get("businessName").asText()).isEqualTo("Maple & Muse");
        assertThat(sellerJson.toString())
                .doesNotContain("UA213223130000026007233566001", "owner@example.com", "+380501112233",
                        "1 Warehouse Street", "GSTIN-0001", "bcrypt-hash");
    }

    @Test
    void reviewExposesOnlyTheAuthorsName() {
        User author = new User();
        author.setId(4L);
        author.setFullName("Ava Johnson");
        author.setEmail("ava.johnson@example.com");
        author.setMobile("+380671112233");
        author.setPassword("bcrypt-hash");
        Address home = new Address();
        home.setAddress("5 Home Street");
        author.getAddresses().add(home);

        Review review = new Review();
        review.setReviewText("Great bag");
        review.setRating(5);
        review.setUser(author);

        JsonNode userJson = mapper.valueToTree(review).get("user");

        assertThat(fieldNames(userJson)).containsExactlyInAnyOrder("id", "fullName");
        assertThat(userJson.get("fullName").asText()).isEqualTo("Ava Johnson");
    }

    private static List<String> fieldNames(JsonNode node) {
        List<String> names = new ArrayList<>();
        node.fieldNames().forEachRemaining(names::add);
        return names;
    }
}
