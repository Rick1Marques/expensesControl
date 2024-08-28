import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import { ListItemButton} from "@mui/material";

type GroupCardProps = {
    name: string,
    totalAmount: number,
    totalEntries: number,
    groupType: "vendor" | "category"
}

export default function GroupCard({name, totalAmount, totalEntries, groupType}:GroupCardProps){
    const {handleChangeSelectedGroupsFilter}=useContext(ExpensesContext)

    return(
        <ListItemButton onClick={()=>handleChangeSelectedGroupsFilter(name, groupType)}>
                    <p>{name}</p>
                    <p>{totalAmount}</p>
                    <p>{totalEntries}</p>
        </ListItemButton>
    )
}