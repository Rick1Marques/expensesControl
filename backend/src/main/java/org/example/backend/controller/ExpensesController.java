package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.example.backend.service.ExpenseService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpenseService expenseService;

    @PostMapping
    public Expense postExpense(@RequestBody ExpenseDto userEntries){
        return expenseService.addExpense(userEntries);
    }

}
