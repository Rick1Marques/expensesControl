import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import { ListItemButton, Paper, Typography} from "@mui/material";

type GroupCardProps = {
    name: string,
    totalAmount: number,
    totalEntries: number,
    groupType: "vendor" | "category"
}

export default function GroupCard({name, totalAmount, groupType}: GroupCardProps) {
    const {handleChangeSelectedGroupsFilter} = useContext(ExpensesContext)

    return (
        <ListItemButton onClick={() => handleChangeSelectedGroupsFilter(name, groupType)}
        sx={{
            p: "0"
        }}>
            <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                aspectRatio: "1 / 1",
                p: "7%"
            }}
            >
                <Typography variant="h5">{name[0].toUpperCase() + name.slice(1)}</Typography>
                <Typography variant="h6">{totalAmount}$</Typography>
            </Paper>
        </ListItemButton>
    )
}