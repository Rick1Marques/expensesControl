import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import BigChart from "./components/BigChart.tsx";
import DetailsScreen from "./components/DetailsScreen.tsx";
import {Box} from "@mui/material";
import SelectionCockpit from "./components/SelectionCockpit.tsx";

export default function App() {

    return (
        <ExpensesContextProvider>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
            }}>
                <SelectionCockpit/>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <DetailsScreen/>
                    <BigChart/>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <GroupList title={"vendor"}/>
                    <GroupList title={"category"}/>
                    <ExpensesList/>
                </Box>

            </Box>
        </ExpensesContextProvider>
    )
}
