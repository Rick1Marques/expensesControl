import {createContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios from "axios";


type ExpensesContext = {
    expenses: Expense[]
}

type ExpensesContextProviderProps = {
    children: React.ReactNode
}


export const ExpensesContext = createContext<ExpensesContext>({
    expenses: []
})


export default function ExpensesContextProvider({children}: ExpensesContextProviderProps) {
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


    const ctxValue = {
        expenses: expenses
    }
    return (
        <ExpensesContext.Provider value={ctxValue}>
            {children}
        </ExpensesContext.Provider>

    )
}