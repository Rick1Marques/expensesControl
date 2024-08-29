import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import PieChart from "./PieChart.tsx";
import ExpenseDetailCard from "./ExpenseDetailCard.tsx";
import {Box} from "@mui/material";
import DetailCompareInfos from "./DetailCompareInfos.tsx";

export default function DetailsScreen() {
    const {selectedGroupsFilter} = useContext(ExpensesContext)

    return (
        <Box
            sx={{
                width: "30%",
                minWidth: "300px"
            }}>
            {!selectedGroupsFilter ?
                <PieChart/> :
                (
                <>
                    {selectedGroupsFilter!.groupType === "expenses"
                        ?
                        <ExpenseDetailCard id={selectedGroupsFilter.selectedGroups![0]}/>
                        :
                        <DetailCompareInfos/>
                        }
                </>
            )}

        </Box>
    )
}




