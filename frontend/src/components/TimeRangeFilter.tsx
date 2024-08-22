import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

export default function TimeRangeFilter() {
    const {handleChangeTimeRange} = useContext(ExpensesContext)
    return (
        <section>
            <button onClick={()=>handleChangeTimeRange("WEEK")}>Week</button>
            <button onClick={()=>handleChangeTimeRange("MONTH")}>Month</button>
            <button onClick={()=>handleChangeTimeRange("YEAR")}>Year</button>
            <button onClick={()=>handleChangeTimeRange("ALL")}>All</button>
        </section>
    )
}