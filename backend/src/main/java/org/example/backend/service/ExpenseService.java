package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.DB.ExpenseRepo;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepo expenseRepo;

    public Expense addExpense(ExpenseDto userEntries) {
        Expense newExpense = new Expense(
                null,
                userEntries.category(),
                userEntries.vendor(),
                userEntries.amount(),
                userEntries.isCashPayment(),
                userEntries.description(),
                userEntries.date()
        );
        return expenseRepo.save(newExpense);
    }

    public List<Expense> findAllExpenses() {
        return expenseRepo.findAll();
    }
}
