package com.store.model;

import com.store.domain.PaymentStatus;
import lombok.Data;

@Data
public class PaymentDetails {

    private String paymentId;
    private String paymentLinkId;
    private String paymentLinkReferenceId;
    private String paymentLinkStatus;
    private String payPaymentId;
    private PaymentStatus status;
}
