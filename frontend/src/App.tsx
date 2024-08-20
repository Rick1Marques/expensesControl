import './App.css'
import ExpensesList from "./components/ExpensesList.tsx";
import ExpensesContextProvider from "./store/expenses-context.tsx";

export default function App() {

  return (
    <ExpensesContextProvider>
        <ExpensesList/>
    </ExpensesContextProvider>
  )
}
