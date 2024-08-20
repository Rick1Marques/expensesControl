import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import ExpenseCard from "./ExpenseCard.tsx";
import {ExpensesContext} from "../store/expenses-context.tsx";


type Order = "asc" | "desc"
type Field = "amount" | "date"

export default function ExpensesList() {
    const{expensesGlobal} = useContext(ExpensesContext)

    const [sortOrder, setSortOrder] = useState<Order>("asc")
    const [sortField, setSortField] = useState<Field>("date")
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        sortExpenses(sortField, sortOrder);
    }, [expensesGlobal, sortOrder, sortField])


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


    function handleFieldChange(field: Field) {
        setSortField(field)
    }

    function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
        setSortOrder(event.target.value as Order)
    }


    return (
        <section>
            <h2>Expenses List</h2>
            <button onClick={() => handleFieldChange("date")}>Date</button>
            <button onClick={() => handleFieldChange("amount")}>Amount</button>
            <label htmlFor="sortOrder"/>
            <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <ul>
                {expenses.map(expense =>
                    <ExpenseCard
                        key={expense.id}
                        vendor={expense.vendor}
                        amount={expense.amount}
                        category={expense.category}
                        date={expense.date}
                        isCashPayment={expense.isCashPayment}
                    />)}
            </ul>
        </section>
    )
}
