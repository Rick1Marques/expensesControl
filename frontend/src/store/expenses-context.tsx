import {createContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios from "axios";


type ExpensesContext = {
    expensesGlobal: Expense[],
    expensesVendor: Group[],
    expensesCategory: Group[]
}

type ExpensesContextProviderProps = {
    children: React.ReactNode
}

type Group = { name: string; totalAmount: number; totalEntries: number }

type GroupType= "vendor" | "category"

export const ExpensesContext = createContext<ExpensesContext>({
    expensesGlobal: [],
    expensesVendor: [],
    expensesCategory: []
})


export default function ExpensesContextProvider({children}: ExpensesContextProviderProps) {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expensesCategory, setExpensesCategory] = useState<Group[]>([])
    const [expensesVendor, setExpensesVendor] = useState<Group[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("api/expenses");
                if (response.status === 200) {
                    const data = await response.data;
                    setExpenses(data)
                    groupExpenses("vendor", data)
                    groupExpenses("category", data)
                } else {
                    console.error("Error fetching data:", response.statusText)
                }
            } catch (error) {
                console.error("Error during fetch:", error)
            }
        }

        fetchData()

    }, [])

    function groupExpenses(groupType: GroupType, data : Expense[]){
        const groupedExpenses = data.reduce((acc, expense) => {
            let key: string;
            if (groupType === "vendor") {
                key = expense.vendor;
            } else {
                key = expense.category;
            }
            if (!acc[key]) {
                acc[key] = {name: key, totalAmount: 0, totalEntries: 0};
            }
            acc[key].totalAmount += expense.amount;
            acc[key].totalEntries += 1;

            return acc;

        }, {} as Record<string, Group>);

        const groupValues = Object.values(groupedExpenses);
        if(groupType === "vendor"){
        setExpensesVendor(groupValues);
        } else {
            setExpensesCategory(groupValues)
        }
    }

    const ctxValue = {
        expensesGlobal: expenses,
        expensesCategory: expensesCategory,
        expensesVendor: expensesVendor
    }

    return (
        <ExpensesContext.Provider value={ctxValue}>
            {children}
        </ExpensesContext.Provider>

    )
}


