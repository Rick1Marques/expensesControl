import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import PieChart from "./PieChart.tsx";
import ExpenseDetailCard from "./ExpenseDetailCard.tsx";
import GroupDetailCard from "./GroupDetailCard.tsx";
import {Box} from "@mui/material";

export default function DetailsScreen() {
    const {selectedGroupsFilter} = useContext(ExpensesContext)

    const {selectedGroups, groupType} = selectedGroupsFilter || {};


    return (
        <Box
            sx={{
                minWidth: "400px"
            }}>
            {!selectedGroupsFilter ? <PieChart/> : (
                <>
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
                </>
            )}

        </Box>
    )
}
