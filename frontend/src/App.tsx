import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import BigChart from "./components/BigChart.tsx";
import DetailsScreen from "./components/DetailsScreen.tsx";
import {Box} from "@mui/material";
import SelectionCockpit from "./components/SelectionCockpit.tsx";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function App() {

    return (
        <ExpensesContextProvider>
            {/*<ThemeProvider theme={darkTheme}>*/}
                <CssBaseline/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}>
                    <SelectionCockpit/>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around"
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

                </Box>
            {/*</ThemeProvider>*/}
        </ExpensesContextProvider>
    )
}
