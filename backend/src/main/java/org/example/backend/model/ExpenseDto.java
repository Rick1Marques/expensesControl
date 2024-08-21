package org.example.backend.model;

import java.time.LocalDate;

public record ExpenseDto(
        String category,
        String vendor,
        double amount,
        boolean isCashPayment,
        String description,
        LocalDate date,
        PaymentFrequency paymentFrequency
) {
}
