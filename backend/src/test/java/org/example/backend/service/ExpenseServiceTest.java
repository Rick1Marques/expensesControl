package org.example.backend.service;

import org.example.backend.DB.ExpenseRepo;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExpenseServiceTest {

    private final ExpenseRepo expenseRepoMock = mock(ExpenseRepo.class);
    private final ExpenseService expenseService = new ExpenseService(expenseRepoMock);

    @Test
    void addExpense() {

        ExpenseDto expenseDto = new ExpenseDto(
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024,5,20)
        );

        Expense expense = new Expense(
                null,
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024,5,20)
        );

        when(expenseRepoMock.save(expense)).thenReturn(expense);

        Expense result = expenseService.addExpense(expenseDto);

        verify(expenseRepoMock).save(expense);

        assertEquals(expense, result);

    }
}