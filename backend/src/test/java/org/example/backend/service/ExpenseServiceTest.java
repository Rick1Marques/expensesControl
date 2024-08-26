package org.example.backend.service;

import org.example.backend.repo.ExpenseRepo;
import org.example.backend.exception.ExpenseNotFoundException;
import org.example.backend.model.Expense;
import org.example.backend.model.ExpenseDto;
import org.example.backend.model.PaymentFrequency;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExpenseServiceTest {

    private final ExpenseRepo expenseRepoMock = mock(ExpenseRepo.class);
    private final ExpenseService expenseService = new ExpenseService(expenseRepoMock);

    @Test
    void findAllExpenses() {
        Expense expenseEx1 = new Expense(
                "1",
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );
        Expense expenseEx2 = new Expense(
                "2",
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        List<Expense> listOfExpensesEx = List.of(expenseEx1, expenseEx2);

        when(expenseRepoMock.findAll()).thenReturn(listOfExpensesEx);

        List<Expense> result = expenseService.findAllExpenses();

        verify(expenseRepoMock).findAll();

        assertEquals(listOfExpensesEx, result);


    }

    @Test
    void addExpense() {

        ExpenseDto expenseDto = new ExpenseDto(
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        Expense expense = new Expense(
                null,
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        when(expenseRepoMock.save(expense)).thenReturn(expense);

        Expense result = expenseService.addExpense(expenseDto);

        verify(expenseRepoMock).save(expense);

        assertEquals(expense, result);

    }


    @Test
    void deleteExpense() {

        Expense expenseEx1 = new Expense(
                "1",
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        when(expenseRepoMock.existsById(expenseEx1.id())).thenReturn(true);
        doNothing().when(expenseRepoMock).deleteById(expenseEx1.id());

        String result = expenseService.deleteExpense("1");

        verify(expenseRepoMock).existsById(expenseEx1.id());
        verify(expenseRepoMock).deleteById(expenseEx1.id());

        assertEquals(expenseEx1.id(), result);

    }

    @Test
    void throwException_deleteExpense() {

        Expense expenseEx1 = new Expense(
                "99",
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        when(expenseRepoMock.existsById(expenseEx1.id())).thenReturn(false);

        assertThrows(ExpenseNotFoundException.class, () -> expenseService.deleteExpense(expenseEx1.id()));

        verify(expenseRepoMock).existsById(expenseEx1.id());
        verify(expenseRepoMock, never()).deleteById(expenseEx1.id());

    }


    @Test
    void updateExpense() {
        Expense oldExpense = new Expense(
                "1",
                "food",
                "rewe",
                10.50,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        Expense newExpense = new Expense(
                "1",
                "food",
                "edeka",
                23.30,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        when(expenseRepoMock.findById("1")).thenReturn(Optional.of(oldExpense));
        when(expenseRepoMock.save(newExpense)).thenReturn(newExpense);

        Expense result = expenseService.updateExpense(newExpense, "1");

        verify(expenseRepoMock).findById("1");
        verify(expenseRepoMock).save(newExpense);

        assertEquals(newExpense, result);

    }


    @Test
    void returnExpense1_whenTimeRangeWeek_findExpensesByTimeRage() {

        LocalDate refDate = LocalDate.now();

        Expense expense1 = new Expense(
                "1",
                "food",
                "edeka",
                23.30,
                false,
                "",
                LocalDate.of(2024, 8, 28),
                PaymentFrequency.ONCE
        );


        List<Expense> expense1List = List.of(expense1);

        LocalDate startDate = LocalDate.of(2024, 8, 26);
        LocalDate endDate = LocalDate.of(2024, 8, 31);

        when(expenseRepoMock.findByDateBetween(startDate, endDate)).thenReturn(expense1List);

        List<Expense> result = expenseService.findExpensesByTimeRage("WEEK", refDate);

        assertEquals(expense1List, result);

    }

    @Test
    void returnExpense1_whenTimeRangeMonth_findExpensesByTimeRage() {

        LocalDate refDate = LocalDate.now();

        Expense expense1 = new Expense(
                "1",
                "food",
                "edeka",
                23.30,
                false,
                "",
                LocalDate.now(),
                PaymentFrequency.ONCE
        );


        List<Expense> expense1List = List.of(expense1);
        LocalDate startDate = refDate.withDayOfMonth(1);
        LocalDate endDate = refDate.withDayOfMonth(refDate.lengthOfMonth());
        when(expenseRepoMock.findByDateBetween(startDate, endDate)).thenReturn(expense1List);

        List<Expense> result = expenseService.findExpensesByTimeRage("MONTH", refDate);

        assertEquals(expense1List, result);

    }


    @Test
    void returnExpense1_whenTimeRangeYear_findExpensesByTimeRage() {

        LocalDate refDate = LocalDate.now();

        Expense expense1 = new Expense(
                "1",
                "food",
                "edeka",
                23.30,
                false,
                "",
                LocalDate.now(),
                PaymentFrequency.ONCE
        );


        List<Expense> expense1List = List.of(expense1);

        LocalDate startDate = refDate.withDayOfYear(1);
        LocalDate endDate = refDate.withDayOfYear(refDate.lengthOfYear());

        when(expenseRepoMock.findByDateBetween(startDate, endDate)).thenReturn(expense1List);

        List<Expense> result = expenseService.findExpensesByTimeRage("YEAR", refDate);

        assertEquals(expense1List, result);

    }


}


