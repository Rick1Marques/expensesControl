package org.example.backend.exception;

public class ExpenseNotFoundException extends RuntimeException{
    public ExpenseNotFoundException(String id){
        super("Expense not found with id: " + id);
    }
}
