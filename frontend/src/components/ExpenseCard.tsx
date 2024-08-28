import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import FormDialog from "./FormDialog.tsx";
import {Expense} from "../model/Expense.ts";
import {IconButton, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";

type ExpenseCardProps = {
    expense: Expense;
}


export default function ExpenseCard({expense}: ExpenseCardProps) {
    const {id, vendor, amount, category, date, isCashPayment, paymentFrequency} = expense;
    const {handleChangeSelectedGroupsFilter} = useContext(ExpensesContext)


    async function handleDelete() {
        try {
            const response = await axios.delete(`api/expenses/${id}`)
            console.log("Expense deleted with success!!!", response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ListItem>
            <article>
                <p>{vendor}</p>
                <p>{amount}</p>
                <p>{category}</p>
                {isCashPayment && <p>cash</p>}
                <p>{date}</p>
                <p>{paymentFrequency}</p>
                <FormDialog type="edit" expense={expense}/>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={() => handleChangeSelectedGroupsFilter(id, "expenses")}>
                    <InfoIcon/>
                </IconButton>
            </article>
        </ListItem>
    )

}