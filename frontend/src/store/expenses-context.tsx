import {createContext, useEffect, useState} from "react";
import {Expense} from "../model/Expense.ts";
import axios, {AxiosResponse} from "axios";
import {groupExpenses} from "../util/groupExpenses.ts";


type Group = { name: string; totalAmount: number; totalEntries: number }
type GroupType = "vendor" | "category" | "date" ;
type ExpensesContext = {
    expensesGlobal: Expense[],
    expensesVendor: Group[],
    expensesCategory: Group[],
    refDate: string,
    timeRange: string,
    selectedGroupsFilter: {
        selectedGroups: string[],
        groupType: GroupType
    } | null,
    handleChangeTimeRange: (timeRange: string) => void,
    handleChangeRefDate: (refDate: string) => void,
    handleChangeSelectedGroupsFilter: (group: string, groupType: GroupType) => void,
}

export const ExpensesContext = createContext<ExpensesContext>({
    expensesGlobal: [],
    expensesVendor: [],
    expensesCategory: [],
    refDate: "",
    timeRange: "",
    selectedGroupsFilter: null,
    handleChangeTimeRange: () => {
    },
    handleChangeRefDate: () => {
    },
    handleChangeSelectedGroupsFilter: () => {
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
    const [refDate, setRefDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [selectedGroupsFilter, setSelectedGroupsFilter] = useState<{
        selectedGroups: string[],
        groupType: GroupType
    } | null>(null)

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

    function handleChangeSelectedGroupsFilter(group: string, groupType: GroupType) {
        if (selectedGroupsFilter?.groupType === groupType) {
            let groups = [...selectedGroupsFilter.selectedGroups]
            if (groups.includes(group)) {
                groups = groups.filter(e => e != group)
                // Should I turn the value of selectedGroupsFilter to null?
                // if()
            } else {
                groups.push(group)
            }
            setSelectedGroupsFilter({selectedGroups: groups, groupType})
        } else {
            setSelectedGroupsFilter({selectedGroups: [group], groupType})
        }
        console.log(selectedGroupsFilter)
    }

    const ctxValue = {
        expensesGlobal: expenses,
        expensesCategory,
        expensesVendor,
        refDate,
        timeRange,
        selectedGroupsFilter,
        handleChangeTimeRange,
        handleChangeRefDate,
        handleChangeSelectedGroupsFilter
    }

    return (
        <ExpensesContext.Provider value={ctxValue}>
            {children}
        </ExpensesContext.Provider>

    )
}


