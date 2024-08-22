package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.example.backend.model.TimeRange;
import org.example.backend.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenseService;

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.findAllExpenses();
    }

    @GetMapping("/filter")
    public List<Expense> filterExpenses(
            @RequestParam TimeRange timeRange,
            @RequestParam LocalDate currentDate
            ) {
        return expenseService.findExpensesByTimeRage(timeRange, currentDate);
    }

    @PostMapping
    public Expense postExpense(@RequestBody ExpenseDto userEntries) {
        return expenseService.addExpense(userEntries);
    }

    @DeleteMapping("{id}")
    public String deleteExpense(@PathVariable String id) {
        return expenseService.deleteExpense(id);
    }

    @PutMapping("{id}")
    public Expense putExpense(
            @RequestBody Expense expense,
            @PathVariable String id
    ) {
        return expenseService.updateExpense(expense, id);
    }

}
