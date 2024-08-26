package org.example.backend.repo;

import org.example.backend.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepo extends MongoRepository<Expense, String> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
