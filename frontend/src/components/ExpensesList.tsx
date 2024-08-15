import {useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios from "axios";


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

    return (
        <>
            <h1>{expenses[0].vendor}</h1>
        </>
    )
}