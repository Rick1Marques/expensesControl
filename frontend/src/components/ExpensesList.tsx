import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import ExpenseCard from "./ExpenseCard.tsx";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {Box, List} from "@mui/material";


type Order = "asc" | "desc"
type Field = "amount" | "date"

export default function ExpensesList() {
    const {expensesGlobal} = useContext(ExpensesContext)
    const [sortOrder, setSortOrder] = useState<Order>("asc")
    const [sortField, setSortField] = useState<Field>("date")
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        function sortExpenses(field: Field, order: Order) {

            const sortedExpenses = [...expensesGlobal].sort((a, b) => {
                let comparison = 0;
                if (field === "amount") {
                    comparison = a.amount - b.amount
                } else if (field === "date") {
                    const dateA = new Date(a.date).getTime()
                    const dateB = new Date(b.date).getTime()
                    comparison = dateA - dateB;
                }
                return order === "asc" ? comparison : -comparison
            })

            setExpenses(sortedExpenses)
        }

        sortExpenses(sortField, sortOrder);
    }, [expensesGlobal, sortOrder, sortField])


    function handleFieldChange(field: Field) {
        setSortField(field)
    }

    function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
        setSortOrder(event.target.value as Order)
    }


    return (
        <Box
            sx={{
                flexBasis: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "600px",
                gap: "10px"
            }}>
            <h2>Expenses List</h2>
            <Box
            sx={{
                display: "flex",
                justifyContent: "space-between"
            }}
            >
                <Box>
                    <button onClick={() => handleFieldChange("date")}>Date</button>
                    <button onClick={() => handleFieldChange("amount")}>Amount</button>
                </Box>
                <Box>
                    <label htmlFor="sortOrder"/>
                    <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </Box>
            </Box>

            <List
                sx={{
                    width: "100%",
                    overflowY: "auto"
                }}>
                {expenses.map(expense =>
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                    />)}
            </List>
        </Box>
    )
}
