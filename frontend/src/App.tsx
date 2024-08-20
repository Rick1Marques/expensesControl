import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";
import GroupList from "./components/GroupList.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <GroupList title={"vendors"}/>
        <GroupList title={"categories"}/>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
