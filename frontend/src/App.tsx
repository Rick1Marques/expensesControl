import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import PieChart from "./components/PieChart.tsx";
import TimeRangeFilter from "./components/TimeRangeFilter.tsx";
import BigChart from "./components/BigChart.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <TimeRangeFilter/>
        <BigChart/>
        <PieChart/>
        <GroupList title={"vendor"}/>
        <GroupList title={"category"}/>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
