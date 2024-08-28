import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {Box} from "@mui/material";

export default function TimeRangeFilter() {
    const {handleChangeTimeRange, handleChangeRefDate, refDate} = useContext(ExpensesContext)
    return (
        <Box>
            <button onClick={() => handleChangeTimeRange("WEEK")}>Week</button>
            <button onClick={() => handleChangeTimeRange("MONTH")}>Month</button>
            <button onClick={() => handleChangeTimeRange("YEAR")}>Year</button>
            <button onClick={() => handleChangeTimeRange("ALL")}>All</button>
            <label htmlFor="refDate">Ref date: </label>
            <input type="date" id="refDate" value={refDate}
                   onChange={(event) => handleChangeRefDate(event.target.value)}/>
        </Box>
    )
}