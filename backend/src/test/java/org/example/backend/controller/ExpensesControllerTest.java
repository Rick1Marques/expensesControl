package org.example.backend.controller;

import org.example.backend.repo.ExpenseRepo;
import org.example.backend.model.Expense;
import org.example.backend.model.PaymentFrequency;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class ExpensesControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ExpenseRepo expenseRepo;

    @Test
    @DirtiesContext
    void getExpenses() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/expenses"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    @DirtiesContext
    void postExpense() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                                          {
                                                                 "category":"food",
                                                                 "vendor":"edeka",
                                                                 "amount":30.70,
                                                                 "isCashPayment":false,
                                                                 "description":"",
                                                                 "date":"2024-05-20",
                                                                 "paymentFrequency": "ONCE"
                                                          }
                                """))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""

                                                {
                                                         "category":"food",
                                                         "vendor":"edeka",
                                                         "amount":30.70,
                                                         "isCashPayment":false,
                                                         "description":"",
                                                         "date":"2024-05-20",
                                                         "paymentFrequency": "ONCE"
                                                }
                        """))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void deleteExpense() throws Exception {

        Expense expense = new Expense(
                "1",
                "food",
                "edeka",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        expenseRepo.save(expense);


        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/expenses/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void putExpense() throws Exception {

        Expense expense = new Expense(
                "1",
                "food",
                "rewe",
                30.70,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        expenseRepo.save(expense);


        mvc.perform(MockMvcRequestBuilders
                        .put("/api/expenses/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                                "category":"food",
                                "vendor":"edeka",
                                "amount":45.40,
                                "isCashPayment":false,
                                "description":"",
                                "date":"2024-05-20",
                                "paymentFrequency": "ONCE"
                                }
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                {
                                                "id": "1",
                                                "category":"food",
                                                "vendor":"edeka",
                                                "amount":45.40,
                                                "isCashPayment":false,
                                                "description":"",
                                                "date":"2024-05-20",
                                                "paymentFrequency": "ONCE"
                                                }
                        """));
    }

    @Test
    void filterExpenses() throws Exception {

        Expense expense = new Expense(
                "1",
                "food",
                "edeka",
                45.40,
                false,
                "",
                LocalDate.of(2024, 5, 20),
                PaymentFrequency.ONCE
        );

        expenseRepo.save(expense);

        mvc.perform(MockMvcRequestBuilders
                        .get("/api/expenses/filter")
                        .param("timeRange", "ALL")
                        .param("currentDate", "2024-08-20")
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                [
                                                {
                                                                               "id": "1",
                                                                               "category":"food",
                                                                               "vendor":"edeka",
                                                                               "amount":45.40,
                                                                               "isCashPayment":false,
                                                                               "description":"",
                                                                               "date":"2024-05-20",
                                                                               "paymentFrequency": "ONCE"
                                                                               }

                        ]
"""
                ));
    }
}