package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

public record Expense(
        @MongoId
        String id,
        String category,
        String vendor,
        double amount,
        boolean isCashPayment,
        String description,
        LocalDate date
) {
}
