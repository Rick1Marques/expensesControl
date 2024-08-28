import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import FormDialog from "./FormDialog.tsx";
import {Expense} from "../model/Expense.ts";

type ExpenseCardProps = {
    expense: Expense;
}

export default function ExpenseCard({expense}: ExpenseCardProps) {
    const {id, vendor, amount, category, date, isCashPayment, paymentFrequency} = expense;
    console.log(expense)
    const {handleChangeSelectedGroupsFilter} = useContext(ExpensesContext)
    return (
        <li>
            <article>
                <p>{vendor}</p>
                <p>{amount}</p>
                <p>{category}</p>
                {isCashPayment && <p>cash</p>}
                <p>{date}</p>
                <p>{paymentFrequency}</p>
                <FormDialog type="edit" expense={expense}/>
                <button onClick={() => handleChangeSelectedGroupsFilter(id, "expenses")}>Details
                </button>
            </article>
        </li>
    )

}