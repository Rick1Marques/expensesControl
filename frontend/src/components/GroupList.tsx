import {ChangeEvent, useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import GroupCard from "./GroupCard.tsx";
import {Box, List} from "@mui/material";

type Order = "asc" | "desc"
type Field = "amount" | "alpha"

type ListProps = {
    title: "vendor" | "category",
}

type Group = { name: string; totalAmount: number; totalEntries: number }

export default function GroupList({title}: ListProps) {
    const {expensesGlobal, expensesCategory, expensesVendor} = useContext(ExpensesContext)

    const [sortOrder, setSortOrder] = useState<Order>("desc")
    const [sortField, setSortField] = useState<Field>("amount")
    const [expensesGroup, setExpensesGroup] = useState<Group[]>([])


    useEffect(() => {

        function sortExpenses(field: Field, order: Order) {

            let groupedExpenses: Group[]
            if (title === "vendor") {
                groupedExpenses = [...expensesVendor];
            } else {
                groupedExpenses = [...expensesCategory]
            }


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
    }, [expensesGlobal, sortOrder, sortField, title, expensesCategory, expensesVendor])


    function handleFieldChange(field: Field) {
        setSortField(field)
    }

    function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
        setSortOrder(event.target.value as Order)
    }


    return (
        <Box
            sx={{
                flexBasis: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "600px",
                gap: "10px"
            }}>
            <h2>{title}</h2>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <button onClick={() => handleFieldChange("alpha")}>Alpha</button>
                    <button onClick={() => handleFieldChange("amount")}>Amount</button>
                </Box>
                <Box>
                    <label htmlFor="sortOrder"/>
                    <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </Box>
            </Box>

            <List
                sx={{
                    width: "100%",
                    overflowY: "auto"
                }}
            >
                {expensesGroup.map(group =>
                    (<GroupCard key={group.name} name={group.name} totalAmount={group.totalAmount}
                                totalEntries={group.totalEntries} groupType={title}/>)
                )}
            </List>

        </Box>)
}