import {ChangeEvent, useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import GroupCard from "./GroupCard.tsx";
import {Box, ButtonGroup, FormControl,  List, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";

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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "700px",
                gap: "10px",
                minWidth: "30%"
            }}>
            <h2>{title}</h2>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottom: "1px solid black",
                    pb: "10px",
                }}
            >
                <Box>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button size="small" onClick={() => handleFieldChange("alpha")}>Alpha</Button>
                    <Button size="small"onClick={() => handleFieldChange("amount")}>Amount</Button>
                    </ButtonGroup>
                </Box>
                    <FormControl variant="standard" sx={{ minWidth: 80}}>
                        <Select
                            labelId="sortOrder"
                            id="sortOrder"
                            value={sortOrder}
                            onChange={handleOrderChange}
                            label="sortOrder"
                        >
                            <MenuItem value="asc">Asc</MenuItem>
                            <MenuItem value="desc">Desc</MenuItem>
                        </Select>
                    </FormControl>
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