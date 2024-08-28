import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import TimeRangeFilter from "./components/TimeRangeFilter.tsx";
import BigChart from "./components/BigChart.tsx";
import DetailsScreen from "./components/DetailsScreen.tsx";
import FormDialog from "./components/FormDialog.tsx";
import {Box, Container} from "@mui/material";

export default function App() {

    return (
        <ExpensesContextProvider>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <TimeRangeFilter/>
                    <FormDialog type="add"/>
                </Box>

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
                        justifyContent: "space-around"
                    }}>
                    <GroupList title={"vendor"}/>
                    <GroupList title={"category"}/>
                    <ExpensesList/>
                </Box>

            </Container>
        </ExpensesContextProvider>
    )
}
