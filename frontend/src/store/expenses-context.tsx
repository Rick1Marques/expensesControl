import {createContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios, {AxiosResponse} from "axios";
import {groupExpenses} from "../util/groupExpenses.ts";


type Group = { name: string; totalAmount: number; totalEntries: number }

type ExpensesContext = {
    expensesGlobal: Expense[],
    expensesVendor: Group[],
    expensesCategory: Group[],
    refDate: string | undefined,
    timeRange: string,
    handleChangeTimeRange: (timeRange: string) => void,
    handleChangeRefDate: (refDate: string) => void
}

export const ExpensesContext = createContext<ExpensesContext>({
    expensesGlobal: [],
    expensesVendor: [],
    expensesCategory: [],
    refDate: "",
    timeRange: "",
    handleChangeTimeRange: () => {
    },
    handleChangeRefDate: () => {
    },

})

type ExpensesContextProviderProps = {
    children: React.ReactNode
}
export default function ExpensesContextProvider({children}: ExpensesContextProviderProps) {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expensesCategory, setExpensesCategory] = useState<Group[]>([])
    const [expensesVendor, setExpensesVendor] = useState<Group[]>([])
    const [timeRange, setTimeRange] = useState<string>("MONTH")
    const [refDate, setRefDate] = useState<string>(new Date().toISOString().split('T')[0])

    useEffect(() => {
        async function fetchData() {
            try {
                const response: AxiosResponse = timeRange === "ALL"
                ? await axios.get("api/expenses")
                    : await axios.get("api/expenses/filter", {
                        params: {timeRange, refDate}
                    })

                if (response.status === 200) {
                    const data = await response.data;
                    setExpenses(data)
                    setExpensesVendor(groupExpenses("vendor", data))
                    setExpensesCategory(groupExpenses("category", data))
                } else {
                    console.error("Error fetching data:", response.statusText)
                }
            } catch (error) {
                console.error("Error during fetch:", error)
            }
        }

        fetchData()

    }, [timeRange, refDate])


    function handleChangeTimeRange(timeRange: string) {
        setTimeRange(timeRange);
    }

    function handleChangeRefDate(refDate: string) {
        setRefDate(refDate);
    }

    const ctxValue = {
        expensesGlobal: expenses,
        expensesCategory,
        expensesVendor,
        refDate,
        timeRange,
        handleChangeTimeRange: handleChangeTimeRange,
        handleChangeRefDate: handleChangeRefDate
    }

    return (
        <ExpensesContext.Provider value={ctxValue}>
            {children}
        </ExpensesContext.Provider>

    )
}


