import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";
import PieChart from "./components/PieChart.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <PieChart/>
        <GroupList title={"vendor"}/>
        <GroupList title={"category"}/>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
