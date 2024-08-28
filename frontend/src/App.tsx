import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import TimeRangeFilter from "./components/TimeRangeFilter.tsx";
import BigChart from "./components/BigChart.tsx";
import DetailsScreen from "./components/DetailsScreen.tsx";
import FormDialog from "./components/FormDialog.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <TimeRangeFilter/>
        <FormDialog type="add"/>
        <DetailsScreen/>
        <BigChart/>
        <GroupList title={"vendor"}/>
        <GroupList title={"category"}/>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
