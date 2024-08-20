import {ChangeEvent, useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import GroupCard from "./GroupCard.tsx";

type Order = "asc" | "desc"
type Field = "amount" | "alpha"

type ListProps = {
    title: "vendors" | "categories",
}

type Group = { name: string; totalAmount: number; totalEntries: number }

export default function GroupList({title}: ListProps) {
    const {expensesGlobal} = useContext(ExpensesContext)

    const [sortOrder, setSortOrder] = useState<Order>("desc")
    const [sortField, setSortField] = useState<Field>("amount")
    const [expensesGroup, setExpensesGroup] = useState<Group[]>([])


    useEffect(() => {

    function sortExpenses(field: Field, order: Order) {

        // GROUP
        const groupExpenses = expensesGlobal.reduce((acc, expense) => {
            let key: string;
            if (title === "vendors") {
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

        const groupedExpenses = Object.values(groupExpenses);

        const sortedExpensesGroup = [...groupedExpenses].sort((a, b) => {
            let comparison = 0;
            if (field === "amount") {
                comparison = a.totalAmount - b.totalAmount
            } else if (field === "alpha") {
                comparison = a.name.localeCompare(b.name)
            }
            return order === "asc" ? comparison : -comparison
        })

        setExpensesGroup(sortedExpensesGroup)
    }
        sortExpenses(sortField, sortOrder);
    }, [expensesGlobal, sortOrder, sortField, title])




    function handleFieldChange(field: Field) {
        setSortField(field)
    }

    function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
        setSortOrder(event.target.value as Order)
    }


    return (<section>
        <h2>{title}</h2>
        <button onClick={() => handleFieldChange("alpha")}>Alpha</button>
        <button onClick={() => handleFieldChange("amount")}>Amount</button>
        <label htmlFor="sortOrder"/>
        <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>

        <ul>
            {expensesGroup.map(group => {
                return (<GroupCard key={group.name} name={group.name} totalAmount={group.totalAmount} totalEntries={group.totalEntries}/>)
            })}
        </ul>
    </section>)
}