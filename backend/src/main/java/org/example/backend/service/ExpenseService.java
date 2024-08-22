package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.repo.ExpenseRepo;
import org.example.backend.exception.ExpenseNotFoundException;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.example.backend.model.TimeRange;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
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
                userEntries.date(),
                userEntries.paymentFrequency()
        );
        return expenseRepo.save(newExpense);
    }


    public String deleteExpense(String id) throws ExpenseNotFoundException {
        if (!expenseRepo.existsById(id)) {
            throw new ExpenseNotFoundException(id);
        }
        expenseRepo.deleteById(id);
        return id;
    }

    public Expense updateExpense(Expense expense, String id) throws ExpenseNotFoundException {
        Expense oldExpense = expenseRepo.findById(id).orElseThrow(() -> new ExpenseNotFoundException(id));
        Expense updatedExpense = oldExpense
                .withCategory(expense.category())
                .withVendor(expense.vendor())
                .withAmount(expense.amount())
                .withCashPayment(expense.isCashPayment())
                .withDescription(expense.description())
                .withDate(expense.date())
                .withPaymentFrequency(expense.paymentFrequency());

        return expenseRepo.save(updatedExpense);

    }

    public List<Expense> findExpensesByTimeRage(TimeRange timeRange, LocalDate currentDate) {

        LocalDate startDate;
        LocalDate endDate;

        switch (timeRange) {
            case TimeRange.WEEK:
                startDate = currentDate.with(DayOfWeek.MONDAY);
                endDate = currentDate.with(DayOfWeek.SUNDAY);
                break;
            case TimeRange.YEAR:
                startDate = currentDate.withDayOfYear(1);
                endDate = currentDate.withDayOfYear(currentDate.lengthOfYear());
                break;
            case TimeRange.ALL:
                startDate = LocalDate.of(1970, 1, 1);
                endDate = LocalDate.of(9999, 12, 31);
                break;
            default:
                startDate = currentDate.withDayOfMonth(1);
                endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        }

        return expenseRepo.findByDateBetween(startDate, endDate);
    }
}
