import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import TimeRangeFilter from "./components/TimeRangeFilter.tsx";
import BigChart from "./components/BigChart.tsx";
import DetailsScreen from "./components/DetailsScreen.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <TimeRangeFilter/>
        <DetailsScreen/>
        <BigChart/>
        <GroupList title={"vendor"}/>
        <GroupList title={"category"}/>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
