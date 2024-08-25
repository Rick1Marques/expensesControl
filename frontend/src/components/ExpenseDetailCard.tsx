import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

type ExpenseDetailProps = {
    id: string
}

export default function ExpenseDetailCard({id}:ExpenseDetailProps){
    const{expensesGlobal} = useContext(ExpensesContext)

    const expense = expensesGlobal.find(expense => expense.id === id)

    return(
        <article>
            <p>{expense!.category}</p>
            <p>{expense!.vendor}</p>
            <p>{expense!.amount}</p>
            <p>{expense!.date}</p>
            <p>{expense!.description}</p>
            <p>{expense!.isCashPayment}</p>
            <p>{expense!.paymentFrequency}</p>
        </article>
    )

}