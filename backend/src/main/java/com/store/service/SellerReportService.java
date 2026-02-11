package com.store.service;

import com.store.model.Seller;
import com.store.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
