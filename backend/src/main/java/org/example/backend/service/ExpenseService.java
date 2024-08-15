package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.DB.ExpenseRepo;
import org.example.backend.exception.ExpenseNotFoundException;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepo expenseRepo;

    public List<Expense> findAllExpenses() {
        return expenseRepo.findAll();
    }


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


    public String deleteExpense(String id) throws ExpenseNotFoundException {
        if(!expenseRepo.existsById(id)) {
            throw new ExpenseNotFoundException(id);
        }
        expenseRepo.deleteById(id);
        return id;
    }

    public Expense updateExpense(Expense expense, String id) throws ExpenseNotFoundException {
        Expense oldExpense = expenseRepo.findById(id).orElseThrow(()-> new ExpenseNotFoundException(id));
        Expense updatedExpense = oldExpense
                .withCategory(expense.category())
                .withVendor(expense.vendor())
                .withAmount(expense.amount())
                .withCashPayment(expense.isCashPayment())
                .withDescription(expense.description())
                .withDate(expense.date());

        return expenseRepo.save(updatedExpense);

    }
}
