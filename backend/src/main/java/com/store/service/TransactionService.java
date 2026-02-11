package com.store.service;

import com.store.model.Order;
import com.store.model.Seller;
import com.store.model.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySeller(Seller seller);
    List<Transaction> getAllTransactions();
}
