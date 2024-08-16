import {useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios from "axios";
import ExpenseCard from "./ExpenseCard.tsx";


export default function ExpensesList() {
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("api/expenses");
                if (response.status === 200) {
                    const data = await response.data;
                    setExpenses(data)
                } else {
                    console.error("Error fetching data:", response.statusText)
                }
            } catch (error) {
                console.error("Error during fetch:", error)
            }
        }
        fetchData()

    }, [])

    function listFilter(type: keyof Expense) {
        const sortedExpenses = [...expenses].sort((a, b) => {
            if(type === "amount"){
                return b.amount - a.amount
            } else {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
                return dateB - dateA;
            }
        });
        setExpenses(sortedExpenses);
    }

    return (
        <section>
            <h2>Expenses List</h2>
            <button onClick={()=>listFilter("date")}>Date</button>
            <button onClick={()=>listFilter("amount")}>Amount</button>
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
