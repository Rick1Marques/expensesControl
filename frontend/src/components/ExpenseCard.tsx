import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import FormDialog from "./FormDialog.tsx";
import {Expense} from "../model/Expense.ts";
import {Box, Card, CardActions, CardContent, IconButton, ListItem, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";

type ExpenseCardProps = {
    expense: Expense;
}


export default function ExpenseCard({expense}: ExpenseCardProps) {
    const {id, vendor, amount, date, isCashPayment} = expense;
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
        <ListItem sx={{p: "1px"}}>
            <Card sx={{width: "100%"}}>
                <CardContent
                sx={{pb: "0px",
                        "&:last-child": {
                            pb: 0
                        }}}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                m: "2% 8%"
                            }}>
                        <Typography variant="h5">{vendor}</Typography>
                        <Typography variant="subtitle1">{date}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                m: "2% 8%"
                            }}>
                        <Typography variant="h5">{amount}$</Typography>
                        {isCashPayment && <Typography variant="caption">cash</Typography>}
                        </Box>

                    </Box>
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <FormDialog type="edit" expense={expense}/>
                        <IconButton color="info" onClick={() => handleChangeSelectedGroupsFilter(id, "expenses")}>
                            <InfoIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="warning" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </CardActions>
                </CardContent>
            </Card>
        </ListItem>
    )

}