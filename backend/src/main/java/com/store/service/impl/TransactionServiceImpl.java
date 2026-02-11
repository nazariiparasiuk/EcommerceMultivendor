package com.store.service.impl;

import com.store.model.Order;
import com.store.model.Seller;
import com.store.model.Transaction;
import com.store.repository.SellerRepository;
import com.store.repository.TransactionRepository;
import com.store.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) {
        Seller seller = sellerRepository.findById(order.getSellerId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsBySeller(Seller seller) {
        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
