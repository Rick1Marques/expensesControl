import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

export default function TimeRangeFilter() {
    const {handleChangeTimeRange} = useContext(ExpensesContext)
    return (
        <Box>
            <ButtonGroup variant="outlined" size="large">
                <Button onClick={() => handleChangeTimeRange("WEEK")}>Week</Button>
                <Button onClick={() => handleChangeTimeRange("MONTH")}>Month</Button>
                <Button onClick={() => handleChangeTimeRange("YEAR")}>Year</Button>
                <Button onClick={() => handleChangeTimeRange("ALL")}>All</Button>
            </ButtonGroup>

        </Box>
    )
}