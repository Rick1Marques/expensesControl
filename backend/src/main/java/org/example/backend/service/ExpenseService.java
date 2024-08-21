package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.repo.ExpenseRepo;
import org.example.backend.exception.ExpenseNotFoundException;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.example.backend.model.TimeRage;
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

    public List<Expense> findExpensesByTimeRage(TimeRage timeRange, LocalDate currentDate) {

        LocalDate startDate;
        LocalDate endDate;

        switch (timeRange) {
            case TimeRage.WEEK:
                startDate = currentDate.with(DayOfWeek.MONDAY);
                endDate = startDate.plusWeeks(1).minusDays(1);
                break;
            case TimeRage.MONTH:
                startDate = currentDate.withDayOfMonth(1);
                endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
                break;
            case TimeRage.YEAR:
                startDate = currentDate.withDayOfYear(1);
                endDate = currentDate.withDayOfYear(currentDate.lengthOfYear());
                break;
            case TimeRage.ALL:
                startDate = LocalDate.MIN;
                endDate= LocalDate.MAX;
                break;
            default:
                startDate = currentDate.withDayOfMonth(1);
                endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        }

        return expenseRepo.findByDateBetween(startDate, endDate);
    }
}
