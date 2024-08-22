import {createContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios, {AxiosResponse} from "axios";


type Group = { name: string; totalAmount: number; totalEntries: number }

type GroupType = "vendor" | "category"

type ExpensesContext = {
    expensesGlobal: Expense[],
    expensesVendor: Group[],
    expensesCategory: Group[],
    handleChangeTimeRange: (timeRange: string) => void
}

export const ExpensesContext = createContext<ExpensesContext>({
    expensesGlobal: [],
    expensesVendor: [],
    expensesCategory: [],
    handleChangeTimeRange: () => {
    }
})

type ExpensesContextProviderProps = {
    children: React.ReactNode
}
export default function ExpensesContextProvider({children}: ExpensesContextProviderProps) {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expensesCategory, setExpensesCategory] = useState<Group[]>([])
    const [expensesVendor, setExpensesVendor] = useState<Group[]>([])
    const [timeRange, setTimeRange] = useState<string>("MONTH")

    useEffect(() => {
        async function fetchData() {
            const currentDate = new Date().toISOString().split('T')[0];
            try {
                let response: AxiosResponse;
                if (timeRange === "ALL") {
                    response = await axios.get("api/expenses");
                } else {
                    response = await axios.get("api/expenses/filter", {
                        params: {timeRange, currentDate}
                    })
                }
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data)
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

    }, [timeRange])

    function groupExpenses(groupType: GroupType, data: Expense[]) {
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
        if (groupType === "vendor") {
            setExpensesVendor(groupValues);
        } else {
            setExpensesCategory(groupValues)
        }
    }

    function handleChangeTimeRange(timeRange: string) {
        setTimeRange(timeRange);
    }

    const ctxValue = {
        expensesGlobal: expenses,
        expensesCategory: expensesCategory,
        expensesVendor: expensesVendor,
        handleChangeTimeRange: handleChangeTimeRange
    }

    return (
        <ExpensesContext.Provider value={ctxValue}>
            {children}
        </ExpensesContext.Provider>

    )
}


