package org.example.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

@With
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
