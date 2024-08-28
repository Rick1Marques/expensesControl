import {Box} from "@mui/material";
import TimeRangeFilter from "./TimeRangeFilter.tsx";
import FormDialog from "./FormDialog.tsx";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

export default function SelectionCockpit(){
    const {handleChangeRefDate, refDate} = useContext(ExpensesContext)
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            <TimeRangeFilter/>

            <TextField label="Ref Date" variant="outlined" color="primary" type="date" id="refDate" value={refDate}
                       onChange={(event) => handleChangeRefDate(event.target.value)}/>

            <FormDialog type="add"/>
        </Box>
    )
}