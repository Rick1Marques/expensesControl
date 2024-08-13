package org.example.backend.DB;

import org.example.backend.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepo extends MongoRepository<Expense, String> {
}
