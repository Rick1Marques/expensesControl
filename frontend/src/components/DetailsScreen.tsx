import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import PieChart from "./PieChart.tsx";
import ExpenseDetailCard from "./ExpenseDetailCard.tsx";

export default function DetailsScreen(){
    const {selectedGroupsFilter}=useContext(ExpensesContext)
    if(!selectedGroupsFilter || selectedGroupsFilter.selectedGroups.length === 0){
        return <PieChart/>
    } else {
        console.log(selectedGroupsFilter)
    return(
        <section>
            {selectedGroupsFilter!.groupType === "expenses" ? <ExpenseDetailCard id={selectedGroupsFilter!.selectedGroups[0]}/>   : <h2>{selectedGroupsFilter!.groupType}</h2>}
        </section>
    )
    }
}