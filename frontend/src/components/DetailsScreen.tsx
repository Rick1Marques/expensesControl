import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import PieChart from "./PieChart.tsx";
import ExpenseDetailCard from "./ExpenseDetailCard.tsx";
import GroupDetailCard from "./GroupDetailCard.tsx";

export default function DetailsScreen() {
    const {selectedGroupsFilter} = useContext(ExpensesContext)

    const {selectedGroups, groupType} = selectedGroupsFilter || {};

    if (!selectedGroupsFilter) {
        return <PieChart/>
    } else {
        return (
            <section>
                <h2>{groupType}</h2>
                {selectedGroupsFilter!.groupType === "expenses"
                    ?
                    <ExpenseDetailCard id={selectedGroups![0]}/>
                    :
                    <ul>
                        {selectedGroups!.map(group => {
                            return <GroupDetailCard key={group}
                                                    groupName={group}
                                                    groupType={groupType!}/>;
                        })}
                    </ul>}
            </section>
        )
    }
}