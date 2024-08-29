import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import ExpenseCard from "./ExpenseCard.tsx";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {Box, ButtonGroup, FormControl, List, MenuItem, Paper, Select} from "@mui/material";
import Button from "@mui/material/Button";


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
        <Paper elevation={3}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "700px",
                gap: "10px",
                width: "30%",
                minWidth: "300px",
                p: "10px"
            }}>
            <h2>Expenses List</h2>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid black",
                    pb: "10px",
                    width: "100%",
                }}
            >
                <Box>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button size="small" onClick={() => handleFieldChange("date")}>Date</Button>
                    <Button size="small" onClick={() => handleFieldChange("amount")}>Amount</Button>
                    </ButtonGroup>

                </Box>
                <FormControl variant="standard" sx={{minWidth: 80}}>
                    <Select
                        labelId="sortOrder"
                        id="sortOrder"
                        value={sortOrder}
                        onChange={handleOrderChange}
                        label="sortOrder"
                    >
                        <MenuItem value="asc">Asc</MenuItem>
                        <MenuItem value="desc">Desc</MenuItem>
                    </Select>
                </FormControl>
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
        </Paper>
    )
}
